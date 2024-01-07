const express = require('express');
const router = express.Router();
const Book = require('../schemas/book_schema');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: ' Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        const newBook = new Book({ title, author, isbn, availability: true });
        await newBook.save();
        res.json({ message: 'Book adding successful' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Error adding book' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const { title, author, isbn, availability } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, { title, author, isbn, availability }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book updated successfull' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Error updating book' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Error deleting book' });
    }
});

module.exports = router;
