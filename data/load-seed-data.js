require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const genres = require('./genres.js');
const books = require('./books.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
        const savedGenres = await Promise.all(
            genres.map(async genre => {
                const result = await client.query(`
                    INSERT INTO genres (genre)
                    VALUES ($1)
                    RETURNING *;
                `,
                [genre]);

                return result.rows[0];
            })
        );
        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            books.map(book => {
                const genre = savedGenres.find(genre => {
                    return genre.genre === book.genre;
                });
                console.log('AAAAAAA!!!!!:    ' + genre)
                const genreId = genre.id;
                // Use a "parameterized query" to insert the data,
                // Don't forget to "return" the client.query promise!
                return client.query(`
                INSERT INTO books (title, author, pages, is_hardback, genre_id, img)
                VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [book.title, book.author, book.pages, book.is_hardback, genreId, book.img]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
