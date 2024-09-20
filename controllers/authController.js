import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//import users from '../models/userModel.js';
import { config } from '../config/config.js';
import client from '../config/mongodb.js';
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const users = require('../models/userModel');
//const config = require('../config/config');

export const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hashedPassword };

    try {

        const database = client.db("cordoba");
        const user = database.collection("users");

        await user.insertOne(newUser);

        const token = jwt.sign({ payload: newUser.username }, config.secretKey, { expiresIn: config.tokenExpiresIn });

        res.status(201).json({ auth: 'true', token });
        console.log("usuario registrado", newUser);

    } catch (error) {
        console.log("todo mal loco", error);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    //const user = users.find(u => u.username === username);

    const database = client.db("cordoba");
    const user = database.collection("users");
    console.log("como trae el username", username);
    const consulta = {"username": username};
    console.log(consulta);

    try {

        const busqueda = await user.findOne(consulta);


        console.log("login user", busqueda);

        if (!busqueda) return res.status(404).send('usuario inexistente.');

        const passwordIsValid = bcrypt.compareSync(password, busqueda.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ payload: busqueda.username }, config.secretKey, { expiresIn: config.tokenExpiresIn });
        res.status(200).json({ auth: true, token });
    } catch(error){
        console.log("todo mal loco", error);

    }   
};

