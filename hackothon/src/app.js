const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookR');
const memberRoutes = require('./routes/memberR');
const transactionRoutes = require('./routes/transactionR');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/transactions', transactionRoutes);

mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
