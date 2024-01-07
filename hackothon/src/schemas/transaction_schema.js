const mongoose = require('../db/db_connection');

const transactionSchema = new mongoose.Schema({
  memberId: String,
  book_isbn: String,
  BookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', 
  },
  action: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
