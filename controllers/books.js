let db = require('../config/database.js')
const newBook = (req, res) => {
    db.run(`INSERT INTO books (title, author) VALUES (?, ?)`, [req.body.title, req.body.author], function (err) {
        if (err) {
            res.status(500)
                .json({"error":err.message})
                .send();
        } else {
            res.status(201)
                .send({ id: this.lastID, ...req.body })
        }
    });
};

const getBooks = (req, res) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
        if (err) {
            res.status(500)
                .json({"error":err.message})
                .send();
        } else if (rows.length === 0) {
            res.status(404)
                .send();
        } else {
            res.send(rows);
        }
    });
};

const getBookById = (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500)
                .json({"error":err.message})
                .send();
        } else if (row === undefined) {
            res.status(404)
                .send();
        } else {
            res.json(row)
                .send();
        }
    });
}

const deleteBook = (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500)
                .json({"error":err.message})
                .send();
        } else {
            res.status(204)
                .send();
        }

    });
}

const updateBook = (req, res) => {
    const data = { title: req.body.title, author: req.body.author };
    db.run(
        `UPDATE books SET title = ?, author = ? WHERE id = ?`,
        [data.title, data.author, req.params.id],
        (err) => {
            if (err) {
                res.status(500)
                    .json({"error":err.message})
                    .send();
            } else {
                res.status(204)
                    .send();
            }
        });
}

module.exports = {
    newBook,
    deleteBook,
    updateBook,
    getBooks,
    getBookById,
};