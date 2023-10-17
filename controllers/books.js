let db = require('../config/database.js')
const newBook = (req, res, next) => {
    db.run(`INSERT INTO books (name, author) VALUES (?, ?)`, [req.body.name, req.body.author], function (err) {
        if (err) throw err;
        res.send({ id: this.lastID, ...req.body });
    });
};

const getBooks = (req, res) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
};

const getBookById = (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
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
        res.json({"message":"deleted", changes: this.changes})
    });
}

const updateBook = (req, res) => {
    const data = { id: req.body.id, name: req.body.name, author: req.body.author };
    db.run(
        `UPDATE books SET name = ?, author = ? WHERE id = ?`,
        [data.name, data.author, data.id],
        (err) => {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            });
        });
}

module.exports = {
    newBook,
    deleteBook,
    updateBook,
    getBooks,
    getBookById,
};