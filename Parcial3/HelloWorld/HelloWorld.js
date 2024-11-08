const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hola Mundo. Servidor Express contestando');
});

app.listen(8082, () => {
    console.log("Hola mundo en Servidor Express. En el puerto 8082");
    
});