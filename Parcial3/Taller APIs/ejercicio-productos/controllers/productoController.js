const {
    selectProductos,
    selectProducto,
    insertProducto,
    updateProducto,
    deleteProducto
} = require('../dal/mysql');

exports.getProductos = async (req, res) => {
    try{
        const productos = await selectProductos();
        if(!productos) return res.status(404).json("No se encontro ningun producto");
        return res.status(200).json(productos);
    }catch(error){
        return res.status(500).json(error.message);
    }
};

exports.getProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const producto = await selectProducto(id);
        if(!producto) return res.status(404).json("No se encontro el producto con el id: " + id);
        return res.status(200).json(producto);
    }catch(error){
        return res.status(500).json(error.message);
    }
};

exports.createProducto = async (req, res) => {
    try{
        const { nombre, precio, stock } = req.body;

        if(!nombre) return res.status(400).json("Nombre no valido");
        if(!precio || precio < 0) return res.status(400).json("Precio no valido");
        if(!stock || stock < 0) return res.status(400).json("cantidad stock no valida");
        
        const id = await insertProducto(nombre, precio, stock);
        return res.status(201).json("Se creo el producto: " + nombre + " con id:" + id);
    }catch(error){
        return res.status(500).json(error.message);
    }
};

exports.updateProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;
        
        if(!nombre) return res.status(400).json("Nombre no valido");
        if(!precio || precio < 0) return res.status(400).json("Precio no valido");
        if(!stock || stock < 0) return res.status(400).json("cantidad stock no valida");

        const filasAfectadas = await updateProducto(id, nombre, precio, stock);
        if(filasAfectadas == 0) return res.status(404).json("No se encontro el producto con el id: " + id);
        return res.status(200).json("Se actualizo el producto con id: " + id);
    }catch(error){
        return res.status(500).json(error.message);
    }
}

exports.deleteProducto = async (req, res) => {
    try{
        const { id } = req.params;

        const filasAfectadas = await deleteProducto(id);
        if(filasAfectadas == 0) return res.status(404).json("No se encontro el producto con el id: " + id);
        return res.status(200).json("Se elimino el producto con id: "+id);
    }catch(error){
        return res.status(500).json(error.message);
    }
}