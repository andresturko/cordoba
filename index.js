const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`);
});