const mongoose = require('../db/db_connection');


const memberSchema = new mongoose.Schema({
    name: String,
    email:String,
  });



  const Member = mongoose.model('Member', memberSchema)
  module.exports = Member

  