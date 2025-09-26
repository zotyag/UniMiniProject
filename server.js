require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { pool } = require('./db');
const { error } = require('console');

const app = express();
const PORT = 3000;

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
		ORDER BY
		  ${orderBy}
	`);

	res.json(result.rows);
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
