// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

// Database Client
// (create and connect using DATABASE_URL)
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

// Application Setup
const app = express();
// (add middleware utils: logging, cors, static files from public)
// app.use(...)
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));


// API Routes

app.get('/api/books', async (req, res) => {

    try {
        const result = await client.query(`
            SELECT
                id,
                title,
                author,
                pages,
                is_hardback,
                genre,
                img
            FROM BOOKS;
        `);

        res.json(result.rows);
    }
    catch(err) {
        res.result(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/genres', async (req, res) => {
    try {
        const result = await client.query(`
        SELECT *
        FROM genres
        ORDER BY genre
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/books', async (req, res) => {
    const book = req.body;

    try {
        const result = await client.query(`
            INSERT INTO books (title, author, pages, is_hardback, genre_id, img)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
            [book.title, book.author, book.pages, book.is_hardback, book.genre_id, book.img]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});