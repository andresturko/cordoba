import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
//const jwt = require('jsonwebtoken');
//const config = require('../config/config');

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("req.header[authorization]", authHeader);
    if (!authHeader) return res.status(403).send({ auth: false, message: 'Falta token' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).send({ auth: false, message: 'Bearer token malformateado' });
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Fallo en la verificacion del token con secret' });
        req.userId = decoded.id; 
        console.log("verificacion de token", decoded);       
        next();
    });
};