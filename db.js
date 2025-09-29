const { Pool } = require('pg');

const connectionString =
	'postgresql://postgres:wCndzignHptOOMmWkAnIMkxxTNBOkQBw@postgres.railway.internal:5432/railway';
// const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString: connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = { pool };
