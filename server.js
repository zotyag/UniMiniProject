require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { pool } = require('./db');
const { error } = require('console');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
