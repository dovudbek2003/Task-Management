const pg = require("pg");
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, PORT } = require("../common/config/index.js");

const Pool = pg.Pool;

const pool = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    user: DB_USER
});

class Postgres {
    async fetch(SQL, ...args) {
        const client = await pool.connect();
        try {
            const { rows: [row] } = await client.query(SQL, args);
            return row;
        } finally {
            client.release();
        }
    }

    async fetchAll(SQL, ...args) {
        const client = await pool.connect()
        try {
            const { rows } = await client.query(SQL, args)
            return rows
        } finally {
            client.release()
        }
    }
}

module.exports = Postgres;