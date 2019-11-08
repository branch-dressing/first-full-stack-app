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

// http method and path...


// Start the server
// (use PORT from .env!)

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});