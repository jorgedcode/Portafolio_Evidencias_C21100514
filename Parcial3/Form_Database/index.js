const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const PDFDoc = require('pdfkit');
const fs = require('fs');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');

//const { jsPDF } = require("jspdf");
//const doc = new jsPDF();

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'web'
});

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

const validacion = [
    check('nombre').trim(),
    check('apellido').trim(),
    check('email').normalizeEmail(),
    check('ncontrol').trim(),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    check('email').isEmail().withMessage('El email es inválido'),
    check('ncontrol').notEmpty().withMessage('El número de control es obligatorio')
    
];

const validacionConsulta = [
    check('id').trim().notEmpty().withMessage('Escriba un id'),
    check('id').isNumeric().withMessage('Escriba un id valido')
];

const validarUpdate = [
    check('nombre').optional().trim().notEmpty().withMessage('Escriba un nombre valido'),
    check('apellido').optional().trim().notEmpty().withMessage('Escriba un apellido valido'),
    check('email').optional().trim().notEmpty().withMessage('Escriba un email valido').optional().isEmail().normalizeEmail(),
    check('ncontrol').optional().trim().notEmpty().withMessage('Escriba un número de control')
]

app.get('/usuario', validacionConsulta, async (req, res)=> {

    try{
        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { id } = req.query;
        connection.query(
            `SELECT * FROM usuarios WHERE id =  ${id}`,
            function (err, results, fields) {
              console.log(results); // results contains rows returned by server
              if(results.length > 0){
                res.json(results[0]);
              }else{
                res.status(400).json(errors = {errors: [{
                    msg: 'No existe el usuario'
                }]});
              }
              
            }
          );
    }catch(error){
        console.error(error);
    }
})

app.post('/usuarios', validacion, async (req, res) => {

    try{

        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { nombre, apellido, email, ncontrol } = req.body;

        //const result = await connection.promise().execute(`INSERT INTO usuarios (nombre, apellido, email, ncontrol) VALUES ('${nombre}', '${apellido}', '${email}', '${ncontrol}')`);
        connection.query(
            `INSERT INTO usuarios (nombre, apellido, email, ncontrol) VALUES ('${nombre}', '${apellido}', '${email}', '${ncontrol}')`,
            function (err, results, fields) {
                if(err){
                    console.error(err);
                    res.status(500).json({errors: [{
                        msg: 'No se pudo agregar el usuario. '+err.message
                    }]});
                    return;
                }
                if(results.affectedRows > 0){
                    res.status(201).json({msg: 'Usuario agregado correctamente', data : {
                        id: results.insertId,
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        ncontrol: ncontrol
                    }});
                }else{
                    res.status(400).json(errors = {errors: [{
                        msg: 'No se pudo agregar el usuario'
                    }]});
                }
              
            }
          );

    }catch(error){
        console.error("Error: " + error);
        
    }

})

app.put('/usuarios', validacion, validacionConsulta, async (req, res) => {

    try{

        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { nombre, apellido, email, ncontrol } = req.body;
        const { id } = req.query;

        connection.query(
            `UPDATE usuarios SET nombre='${nombre}', apellido='${apellido}', email='${email}', ncontrol='${ncontrol}' WHERE id = ${id}`,
            function (err, results, fields) {
                if(err){
                    console.error(err);
                    res.status(500).json({errors: [{
                        msg: 'No se pudo actualizar el usuario. '+err.message
                    }]});
                    return;
                }
                if(results.affectedRows > 0){
                    res.status(200).json({msg: 'Usuario actualizado correctamente'});
                }else{
                    res.status(400).json(errors = {errors: [{
                        msg: 'No se pudo actualizar el usuario'
                    }]});
                }
              console.log(results); // results contains rows returned by server
            }
          );

    }catch(error){
        console.error("Error: "+error);
        
    }

});

app.patch('/usuarios', validacionConsulta, validarUpdate, async (req, res) => {

    try{

        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { id } = req.query;

        let nombre, apellido, email, ncontrol;
        nombre = req.body.nombre;
        apellido = req.body.apellido;
        email = req.body.email;
        ncontrol = req.body.ncontrol;
        let conNom, conApe, conEmail, conNControl;
        connection.query(
            `SELECT * FROM usuarios WHERE id =  ${id}`,
            function (err, results, fields) {
              if(results.length > 0){
                console.log(results[0]);
                conNom = results[0].nombre;
                conApe = results[0].apellido;
                conEmail = results[0].email;
                conNControl = results[0].ncontrol;
                console.log(conNom, conApe, conEmail, conNControl);
                

                if(!nombre || nombre == undefined) {
                    nombre = conNom
                    console.log(nombre);
                    
                }
                if(!apellido || apellido == undefined) apellido=conApe;
                if(!email || email == undefined) email=conEmail;
                if(!ncontrol || ncontrol == undefined) ncontrol=conNControl;

                connection.query(
                    `UPDATE usuarios SET nombre='${nombre}', apellido='${apellido}', email='${email}', ncontrol='${ncontrol}' WHERE id=${id}`,
                    function (errorUpdate, resultsUpdate, fields){
                        if(errorUpdate){
                            console.error(errorUpdate);
                            res.status(500).json({errors: [{
                                msg: 'No se pudo actualizar el usuario. '+errorUpdate.message
                            }]});
                            return;
                        }
                        if(resultsUpdate.affectedRows > 0){
                            res.status(200).json({msg: 'Usuario actualizado correctamente'});
                        }else{
                            res.status(400).json(errors = {errors: [{
                                msg: 'No se pudo actualizar el usuario'
                            }]});
                        }
                    }
                  )

              }else{
                res.status(400).json(errors = {errors: [{
                    msg: 'No existe el usuario'
                }]});
              }
            }
          );
          console.log(nombre, apellido, email);
          

    }catch(error){
        console.error("Error: "+error);
        
    }

});

app.delete('/usuarios', validacionConsulta, async (req, res) => {

    try{

        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { id } = req.query;

        connection.query(
            `DELETE FROM usuarios WHERE id = ${id}`,
            function (err, results, fields){
                if(err){
                    console.error(err.message);
                    res.status(500).json({errors: [{msg: err.message}]})
                }
                if(results.affectedRows > 0){
                    res.status(200).json({msg: 'Usuario eliminado correctamente'});
                }else{
                    res.status(400).json({errors: [{msg: "No se encontro el usuario"}]});
                }
            }
        )

    }catch(error){
        console.error("Error: "+error);
        
    }

});

app.post('/generarPdf', validacion, async (req, res) => {
    try{
        const validResult = validationResult(req);
        if(!validResult.isEmpty()){
            return res.status(400).send(validResult);
        }
        const { nombre, apellido, email, ncontrol } = req.body; 
        console.log(nombre);
        const imgPath = path.join(__dirname+"/archivos/logo.jpg");
        const docName = "datos-" + Date.now()+".pdf";
        console.log(docName);
        
    
        const doc = new PDFDoc({
            size: 'A4',
            margin: 40
        });
    
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=informacion_usuario.pdf');
    
        doc.fontSize(20).text('Datos', { align: 'center' });
    
        doc.moveDown();
        doc.fontSize(12);
        doc.text('Nombre: ' + nombre + ' ' + apellido);
        doc.text(`Número de control: ${ncontrol}`);
        doc.text('Correo electronico: ' + email);
    
        if (imgPath) {
            if (fs.existsSync(imgPath)) {
                doc.moveDown();
                doc.image(imgPath, doc.page.width - 90 - 10, 10,{
                    width: 90,
                    height: 90
                });
            } else {
                doc.moveDown();
                doc.text('No se pudo cargar la imagen.');
            }
        } else {
            doc.moveDown();
            doc.text('No se subió ninguna imagen.');
        }
        var docPath = path.join(__dirname+'/archivosgen/' + docName);
        //doc.pipe(fs.createWriteStream(docPath));
        doc.end();

        const writeStream = fs.createWriteStream(docPath);
        doc.pipe(writeStream);

        writeStream.on('finish', () => {
            res.sendFile(docPath, (err) => {
                if (err) {
                    console.error("Error al enviar el archivo:", err);
                } else {
                    console.log("Archivo enviado correctamente.");
                }
            });
        });

    }catch(error){
        console.error("Error: "+error);
    }
})

app.listen(8088, () => {
    console.log('Servidor Express escuchando en el puerto 8088');
});