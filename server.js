require('dotenv').config({ debug: true });

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { pool } = require('./db');
const { error } = require('console');
const { Query } = require('pg');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

async function isUsernameTaken(uname) {
	try {
		const numberOfOccurrences = await pool.query(
			'SELECT username FROM users WHERE username = $1',
			[uname],
		);
		return numberOfOccurrences.rows.length > 0;
	} catch (err) {
		console.error('Error while checking username', err.message);
		throw err;
	}
}

// Insert new user into users table upon registration
app.post('/api/register', async (req, res) => {
	const { uname, passwd } = req.body;
	try {
		const usernameTaken = await isUsernameTaken(uname);

		if (usernameTaken)
			return res.status(409).json({ success: false, message: 'Username is already taken' });

		const passwd_hash = await bcrypt.hash(passwd, 10);

		await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [
			uname,
			passwd_hash,
		]);
		res.json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

// Login with an existing user
app.post('/api/login', async (req, res) => {
	const { uname, passwd } = req.body;

	// Query user and check if it exist
	const result = await pool.query('SELECT * FROM users WHERE username = $1', [uname]);
	if (result.rows.length === 0)
		return res.status(400).json({ success: false, message: "User doesn't exist" });

	// Compare passwords and store their data in session if they match
	const user = result.rows[0];
	if (await bcrypt.compare(passwd, user.password_hash)) {
		req.session.user = { id: user.id, role: user.role, uname: user.username };
		res.json({ success: true, user: req.session.user });
	} else {
		res.status(400).json({ success: false, message: "Username and password doesn't match" });
	}
});

// Logout - user data from session
app.post('/api/logout', async (req, res) => {
	req.session.destroy(() => res.json({ success: true }));
});

// New post
app.post('/api/new_post', async (req, res) => {
	if (!req.session.user)
		return res
			.status(401)
			.json({ success: false, message: 'You have to be logged in to make new posts!' });

	const { content, length } = req.body;
	await pool.query('INSERT INTO jokes (author_id, content, length) VALUES ($1, $2, $3)', [
		req.session.user.id,
		content,
		length,
	]);
	res.json({ success: true });
});

// Get posts from database
app.get('/api/posts', async (req, res) => {
	const sort = req.query.sort;
	var orderBy = '';
	if (sort === 'popularity') {
		orderBy = 'popularity DESC, j.created_at DESC;';
	} else {
		orderBy = 'j.created_at DESC';
	}

	const result = await pool.query(`
		SELECT
		  j.id,
		  j.content,
		  u.username AS author,
		  j.length,
		  j.popularity,
		  j.created_at
		FROM jokes j
		  JOIN users u ON j.author_id = u.id
		GROUP BY
		  j.id, u.username, j.content, j.length, j.created_at
		HAVING j.deleted_at IS NULL
		ORDER BY
		  ${orderBy}
	`);

	res.json(result.rows);
});

// Get posts from database with pagination support
app.get('/api/posts', async (req, res) => {
    try {
        const sort = req.query.sort;
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 100;
        
        // Validate pagination parameters
        if (page < 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Page number must be non-negative' 
            });
        }
        
        if (limit <= 0 || limit > 1000) {
            return res.status(400).json({ 
                success: false, 
                message: 'Limit must be between 1 and 1000' 
            });
        }
        
        // Calculate offset
        const offset = page * limit;
        
        // Determine order clause
        let orderBy = '';
        if (sort === 'popularity') {
            orderBy = 'popularity DESC, j.created_at DESC';
        } else {
            orderBy = 'j.created_at DESC';
        }

        // Get total count for pagination metadata
        const countResult = await pool.query(`
            SELECT COUNT(*) as total
            FROM jokes j
            WHERE j.deleted_at IS NULL
        `);
        const totalPosts = parseInt(countResult.rows[0].total);

        // Get paginated posts
        const result = await pool.query(`
            SELECT
              j.id,
              j.content,
              u.username AS author,
              j.length,
              j.popularity,
              j.created_at
            FROM jokes j
              JOIN users u ON j.author_id = u.id
            WHERE j.deleted_at IS NULL
            ORDER BY ${orderBy}
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

        // Calculate pagination metadata
        const hasMore = (offset + result.rows.length) < totalPosts;
        const totalPages = Math.ceil(totalPosts / limit);

        res.json({
            posts: result.rows,
            hasMore: hasMore,
            total: totalPosts,
            currentPage: page,
            totalPages: totalPages,
            limit: limit
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		await pool.query('UPDATE jokes SET deleted_at = NOW() WHERE id =  $1', [id]);
		res.json({ success: true, message: 'Post successfully deleted' });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
});

// Rating
app.post('/api/rate', async (req, res) => {
	const { jokeId, value } = req.body;

	try {
		const existingRating = await pool.query(
			'SELECT value FROM ratings WHERE user_id = $1 AND joke_id = $2',
			[req.session.user.id, jokeId],
		);

		// Ha a user még nem értékelt
		if (existingRating.rows.length === 0) {
			await pool.query(
				`INSERT INTO ratings (user_id, joke_id, value)
				VALUES ($1, $2, $3)`,
				[req.session.user.id, jokeId, value],
			);

			await pool.query('UPDATE jokes SET popularity = popularity + $1 WHERE id = $2', [
				value,
				jokeId,
			]);

			res.json({ success: true, message: 'Rating added.' });
		} else {
			// Ha már értékelt
			const oldValue = existingRating.rows[0].value;
			const diff = value - oldValue;

			await pool.query(
				`UPDATE ratings
				SET value=$3
				WHERE user_id = $1 AND joke_id = $2`,
				[req.session.user.id, jokeId, value],
			);

			await pool.query('UPDATE jokes SET popularity = popularity + $1 WHERE id = $2', [
				diff,
				jokeId,
			]);

			res.json({ success: true, message: 'Rating added.' });
		}
	} catch (err) {
		console.error('Error during rating: ', err);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
});

// Change user role
app.post('/api/changeRole', async (req, res) => {
	try {
		const { user_id, new_role } = req.body;

		await pool.query('UPDATE users SET role = $1 WHERE id = $2', [new_role, user_id]);

		res.json({ success: true, message: "User's role has been modified" });
	} catch (err) {
		console.error('Error during changing roles: ', err);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
});

app.get('/api/currentUserData', async (req, res) => {
	res.json(req.session.user);
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
