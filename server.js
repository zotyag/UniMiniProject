require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { pool } = require('./db');
const { error } = require('console');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
