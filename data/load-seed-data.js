require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const books = require('./books.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
    
        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            books.map(book => {

                // Use a "parameterized query" to insert the data,
                // Don't forget to "return" the client.query promise!
                return client.query(`
                INSERT INTO books (title, author, pages, is_hardback, genre, img)
                VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [book.title, book.author, book.pages, book.is_hardback, book.genre, book.img]);
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
