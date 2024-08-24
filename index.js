import express from 'express';
import './routes/authRoutes.js';
import router from './routes/authRoutes.js';
//const express = require('express');
//const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use('/auth', router);

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});