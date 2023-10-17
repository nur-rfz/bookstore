const express = require('express'); //import express

// 1.
const router  = express.Router();
// 2.
const bookController = require('../controllers/books');
// 3.
router.post('/books', bookController.newBook);
router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.getBookById)
router.delete('/books/:id', bookController.deleteBook)
router.put('/books/:id', bookController.updateBook)
// 4.
module.exports = router; // export to use in server.js