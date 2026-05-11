const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();

//middleware untuk parsing JSON
app.use(express.json());

//gunakan route untuk auth
app.use('/api/auth', authRoutes);

//route untuj profile
app.use('/api/profile', profileRoutes);


module.exports = app;