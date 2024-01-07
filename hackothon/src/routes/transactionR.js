const express = require('express');
const router = express.Router();
const Book = require('../schemas/book_schema');
const Transaction = require('../schemas/transaction_schema');


router.post('/issue', async (req, res) => {
    try {
        const { memberId, book_isbn } = req.body;
        const book = await Book.findOne({ isbn: book_isbn, availability: true });

        if (book) {
            await Book.findOneAndUpdate({ isbn: book_isbn }, { $set: { availability: false } }, { new: true });

            const newTransaction = new Transaction({ memberId, book_isbn, BookId: book._id, action: 'issued' });
            await newTransaction.save();
            res.json({ success: true, message: 'Book issued successfully' });
        } else {
            res.json({ success: false, error: 'Book not available for issuing' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/return', async (req, res) => {
    try {
        const { memberId, book_isbn } = req.body;
        const book = await Book.findOne({ isbn: book_isbn, availability: false });

        if (book) {
            await Book.updateOne({ isbn: book_isbn }, { $set: { availability: true } });

            const newTransaction = new Transaction({ memberId, book_isbn, BookId: book._id, action: 'returned' });
            await newTransaction.save();
            res.json({ success: true, message: 'Book return successful' });
        } else {
            res.json({ success: false, error: 'Invalid book return' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json({ success: true, transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
