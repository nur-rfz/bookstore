let db = require('../config/database.js')
const newBook = (req, res) => {
    db.run(`INSERT INTO books (title, author) VALUES (?, ?)`, [req.body.title, req.body.author], function (err) {
        if (err) throw err;
        res.statusCode = 201;
        res.send({ id: this.lastID, ...req.body });
    });
};

const getBooks = (req, res) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
            res.statusCode=404
            res.send();
            return;
        }
        res.send(rows);
    });
};

const getBookById = (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            res.send()
            return;
        }
        if (row === undefined) {
            res.statusCode=404
            res.send();
            return;
        }
        res.json(row);

    });
}

const deleteBook = (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.statusCode=204
        res.send()
    });
}

const updateBook = (req, res) => {
    const data = { title: req.body.title, author: req.body.author };
    db.run(
        `UPDATE books SET title = ?, author = ? WHERE id = ?`,
        [data.title, data.author, req.params.id],
        (err) => {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.statusCode=204
            res.send()
        });
}

module.exports = {
    newBook,
    deleteBook,
    updateBook,
    getBooks,
    getBookById,
};