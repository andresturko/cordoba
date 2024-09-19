import express/*, { json }*/ from 'express';
import './routes/authRoutes.js';
import router from './routes/authRoutes.js';
//import client from './config/mongodb.js';
//const express = require('express');
//const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use('/auth', router);

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});



//metodo para insertar un solo documento en una coleccion


//si la coleccion no existe, se creara la coleccion
//db.users.insertone(
//   {
//   clave1: "valor",
//   clave2: "valor"
//
//   }
//)