import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../models/userModel.js';
import {config} from '../config/config.js';
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const users = require('../models/userModel');
//const config = require('../config/config');

export const register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id }, config.secretKey, { expiresIn: config.tokenExpiresIn });
    //res.status(201).send({ auth: true, token });
    res.status(201).json({auth: 'true', token});
    console.log("desde controller/register", users);
};

export const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('usuario inexistente.');
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: config.tokenExpiresIn});
    res.status(200).send({auth: true, token});
};

