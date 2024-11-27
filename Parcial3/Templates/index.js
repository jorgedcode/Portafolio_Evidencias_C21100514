const express = require('express');
const app = express();
const path = require('path');

// Implementación del motor de plantillas Pug
const pug = require('pug');

app.set('view engine', 'pug'); // Establece pug como motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Establece donde va estar la carpeta de Views


// Middleware que parsea el cuerpo de la solicitud a JSON, cuando se recibe json
app.use(express.json());

// Middleware que parsea el cuerpo de la solicitud a texto, cuando se recibe texto
app.use(express.text());

// Func middleware que se ejecuta en el ciclo de solicitud respuesta
// en una funcion middleware: Se envia la respuesta o se indica que avance (invoca) a la siguiente
// se pueden hacer que avance a varias funciones
app.use((req, res, next) => {
    console.log('Middleware: Recibiendo una solicitud...');
    next();
});

app.get('/', (req, res) => {
    res.send('Hola Mundo. Servidor Express contestando');
});

app.get('/administrativos', (req, res) => {
    
    
    res.render('admin');
})

app.get('/maestros', (req, res) => {
    console.log(req.body) // req.body es para recibir datos del body. Por ejemplo: un json 
    res.send('Sevidor contestando la peticion GET. Se recibio el body')
})

app.get('/estudiantes/:carrera', (req, res) => {
    console.log(req.params.carrera) // req.query es para recibir los parametros query de la petición
    console.log(req.query.control)
    res.send('Sevidor contestando la peticion GET. Se recibio el param "carrera" y el query "control"')
})


app.listen(8088, () => {
    console.log("Hola mundo en Servidor Express. En el puerto 8082");
    
});