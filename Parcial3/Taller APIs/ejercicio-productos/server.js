const express = require('express');
const dotenv = require('dotenv');
const productosRoutes = require('./routes/productosRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info("Hola mundo server");
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});