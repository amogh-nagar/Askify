const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

connectDB();

// Init middleware
app.use(
  express.json({ extended: false })
); /*as express has body-parser module builtin */

// Define routes

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

// Serve static essets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
