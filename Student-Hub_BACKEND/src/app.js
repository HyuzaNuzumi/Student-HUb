const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();

//middleware untuk parsing JSON
app.use(express.json());

//gunakan route untuk auth
app.use('/api/auth', authRoutes);


module.exports = app;