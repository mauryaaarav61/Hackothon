const mongoose = require('../db/db_connection')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    availability: Boolean
  
  });
  
  module.exports = mongoose.model('Book', bookSchema);