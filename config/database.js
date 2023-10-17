const dbLocation = process.env.DATA_PATH || './db.sqlite'
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(dbLocation, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the SQlite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT)`, (err) => {
    if (err) throw err;
    console.log('Table created');
});

module.exports = db