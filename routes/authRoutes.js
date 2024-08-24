import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; '../middlewares/authMiddleware.js';
//const express = require('express');
//const authController = require('../controllers/authController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Venimos Bien ${req.userId}`);
});

export default router;
