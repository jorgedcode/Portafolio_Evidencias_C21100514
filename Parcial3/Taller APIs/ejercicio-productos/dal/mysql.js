const db = require('../config/mysql');

exports.selectProductos = async () => {
    try{
        const result = await db.promise().query('SELECT * FROM productos');
        return result[0];
    }catch(error){
        console.error(error);
    }
}

exports.selectProducto = async (id) => {
    try{
        const result = await db.promise().query('SELECT * FROM productos WHERE id =?', [id]);
        return result[0][0];
    }catch(error){
        console.error(error);
    }
}

exports.insertProducto = async (nombre, precio, stock) => {
    try{
        const result = await db.promise().execute('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
        return result[0].insertId;
    }catch(error){
        console.error(error);
    }
}

exports.updateProducto = async (id, nombre, precio, stock) => {
    try{
        const result = await db.promise().execute('UPDATE productos SET nombre =?, precio =?, stock =? WHERE id =?', [nombre, precio, stock, id]);
        return result[0].affectedRows;
    }catch(error){
        console.error(error);
    }
}

exports.deleteProducto = async (id) => {
    try{
        const result = await db.promise().execute('DELETE FROM productos WHERE id =?', [id]);
        return result[0].affectedRows;
    }catch(error){
        console.error(error);
    }
}