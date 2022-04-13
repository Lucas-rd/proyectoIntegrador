import express from 'express';
import fs from 'fs';

const getProductsService = async(req) =>{

    try{
        const productsString = await fs.promises.readFile("../proyectoIntegrador/src/data/productos.txt", "utf-8")
        const prductosArray = await JSON.parse(productsString);
        return prductosArray;
    }
    catch(err){
        console.log("Error de lectura", err)
    }
};

const postProductsService = async(req, res)=>{
    try{
        const productsResponse = await getProductsService(req);
        let id = productsResponse.length + 1;
        let time = new Date();
        let { title, description, code, thumbnail, price, stock } = req.body;

        const newProduct = {
            "id":id,
            "timestamp":time,
            "title":title,
            "description": description,
            "code":code,
            "thumbnail":thumbnail,
            "price":price,
            "stock":stock
        };


        productsResponse.push(newProduct);
        const newProductsListString = JSON.stringify(productsResponse);
        console.log(newProductsListString, typeof(newProductsListString));

        const postResponse = await fs.promises.writeFile("../proyectoIntegrador/src/data/productos.txt", newProductsListString);
        console.log("Producto agregado");
        return productsResponse;
    }
    catch(err){
        console.log(err);
    }
};

const putProductsService = async (req, res) =>{
    try{
        const productsResponse = await getProductsService(req);
        let idToUpdate = req.params.pid;
        let time = new Date();
        let { id, title, description, code, thumbnail, price, stock } = req.body;

        const productToRefresh = {
            "id": id,
            "timestamp":time,
            "title":title,
            "description": description,
            "code":code,
            "thumbnail":thumbnail,
            "price":price,
            "stock":stock
        };

        const updateProducts = productsResponse.map(e => e.id == idToUpdate
            ?{productToRefresh}
            :e
            );
        console.log(updateProducts);

        const updateProductsString = JSON.stringify(updateProducts);
        const putResponse = await fs.promises.writeFile("../proyectoIntegrador/src/data/productos.txt", updateProductsString);
        console.log("Producto actualizado");

        return updateProducts;
    }
    catch(err){
        console.log(err)
    }
};

const deleteProductsService = async(req,res)=>{
    try{
        const productsResponse = await getProductsService(req);
        let idToDelete = req.params.pid;
        
        const deletedProducts = productsResponse.filter(e => e.id != idToDelete);
        console.log(deletedProducts);
        
        const deletedProductsString = JSON.stringify(deletedProducts);
        const deleteResponse = await fs.promises.writeFile("../proyectoIntegrador/src/data/productos.txt", deletedProductsString);
        console.log("Producto Elimiando");

        return deletedProducts;
    }
    catch(err){
        console.log(err);
    }
} 

export {getProductsService, postProductsService, putProductsService, deleteProductsService};