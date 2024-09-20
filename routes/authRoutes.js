import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; '../middlewares/authMiddleware.js';
import client from '../config/mongodb.js';
//const express = require('express');
//const authController = require('../controllers/authController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/protected', authMiddleware, async (req, res) => {

      try {

            // Get the database and collection on which to run the operation
            const database = client.db("cordoba");
            const nombres = database.collection("users");


            // Execute query
            const documentos = await nombres.find({}).toArray();
            const docsJson = JSON.stringify(documentos, null, 2);


            console.log("JSON=", docsJson);

            res.status(200).json(JSON.parse(docsJson));


      } catch (error) {
            console.log("todo mal loco", error);
      } 
      //finally {
      //      await client.close();
      //}
}
);

router.get('/protected/:username', authMiddleware, async (req, res) => {

      try {

            // Get the database and collection on which to run the operation
            const database = client.db("cordoba");
            const nombres = database.collection("users");

            // Query for a movie that has the title 'The Room'
            const query = { "username": req.params.username };

            const options = {

                  sort: { "username": -1 },

                  projection: { _id: 0, username: 1, password: 1 },
            };

            // Execute query
            const documento = await nombres.findOne(query, options);

            // Print the document returned by findOne()
            console.log("req =", query);
            console.log("findone:", documento);

            const docJson = JSON.stringify(documento, null, 2);

            console.log("JSON=", docJson);
            res.status(200).json(JSON.parse(docJson));

      } catch (error) {
            console.log("todo mal loco", error);
      }
      // finally {
      //      await client.close();
      //}
}
);

export default router;
