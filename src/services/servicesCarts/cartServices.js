import express, { json } from 'express';
import fs from 'fs';

//Service de GET
const getCartsService = async (req,res)=>{
    try{
        const cartsString = await fs.promises.readFile("../proyectoIntegrador/src/data/carritos.txt", "utf-8");
        const cartsArray = JSON.parse(cartsString);
        let cartId = req.params.cid;
        let productsFromCart = cartsArray.filter(e => e.id == cartId)[0].products;

        return productsFromCart;
    }
    catch(err){
        console.log(err);
    }
};

//Service de POST
const postCartsService = async (req,res)=>{
    try{
        const cartsString = await fs.promises.readFile("../proyectoIntegrador/src/data/carritos.txt", "utf-8");
        const cartsArray = JSON.parse(cartsString);

        let newId = cartsArray.length + 1;
        let newTime = new Date();
        const newCart ={
            "id":newId,
            "timestamp": newTime,
            "products":[]
        }

        cartsArray.push(newCart);
        const newCartsListString = JSON.stringify(cartsArray);
        const postResponse = await fs.promises.writeFile("../proyectoIntegrador/src/data/carritos.txt", newCartsListString);
        console.log("carrito agregado");
        return cartsArray;
    }
    catch(err){
        console.log(err)
    }
};

const postCartsProductsService = async (req,res)=>{
    try{
        const cartsString = await fs.promises.readFile("../proyectoIntegrador/src/data/carritos.txt", "utf-8");
        const cartsArray = JSON.parse(cartsString);
        let cartId = req.params.cid;
        let { id, quantity } = req.body;

        let cart = cartsArray.find(e => e.id == cartId);
        let prdouctsInCart = cart.products.find(e => e.id == id);
        
        if (prdouctsInCart){
            prdouctsInCart.quantity += quantity
        } else {
            cart.products.push(req.body)
        }
        
        const updateCartString = JSON.stringify(cartsArray);
        const postResponse = await fs.promises.writeFile("../proyectoIntegrador/src/data/carritos.txt", updateCartString);

        return cartsArray
    }
    catch(err){
        console.log(err)
    }
};

const deleteCartsService = async (req,res) => {
    try{
        const cartsString = await fs.promises.readFile("../proyectoIntegrador/src/data/carritos.txt", "utf-8");
        const cartsArray = JSON.parse(cartsString);
        let cartId = req.params.cid;
        let cart = cartsArray.find(e => e.id == cartId);
        const newCart = cartsArray.filter( e => e.id != cart.id);

        const updateCartString = JSON.stringify(newCart);
        const response = await fs.promises.writeFile("../proyectoIntegrador/src/data/carritos.txt", updateCartString);

        return newCart
    }
    catch(err){
        console.log(err)
    }
};


const deleteCartsProductsService = async (req,res) => {
    try{
        const cartsString = await fs.promises.readFile("../proyectoIntegrador/src/data/carritos.txt", "utf-8");
        const cartsArray = JSON.parse(cartsString);
        let cartId = req.params.cid;
        let productId = req.params.pid
        console.log(cartId)
        console.log(productId)
        console.log(req.params)

        let cart = cartsArray.find( e => e.id == cartId);
        let productFilter = cart.products.filter( e => e.id != productId);
        
        console.log(cart)
        cart.products = productFilter;
        console.log(cart)
        console.log(cartsArray)

        const updateCartString = JSON.stringify(cartsArray);
        const response = await fs.promises.writeFile("../proyectoIntegrador/src/data/carritos.txt", updateCartString);

        return cartsArray
    }
    catch(err){
        console.log(err)
    }
};



export { getCartsService, postCartsService, postCartsProductsService, deleteCartsService, deleteCartsProductsService };
