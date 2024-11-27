const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

const folder = path.join(__dirname+'/archivos/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//const upload = multer( { dest:folder } );
const upload = multer( {storage: storage} );

app.use(upload.single('archivo'));

// Middlewares que parsean el cuerpo de la solicitud a JSON o texto, cuando se recibe json
app.use(express.json());
app.use(express.text());

app.use(express.urlencoded( { extended : true } ));

app.post('/formulario', (req, res) => {
    console.log(req.body);
    res.send(`Hola ${req.body.nombre}`);
})

app.listen(8088, () => {
    console.log('Servidor Express escuchando en el puerto 8088');
});