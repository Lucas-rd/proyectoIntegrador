import express from 'express';
import { getCartsService, postCartsService, postCartsProductsService, deleteCartsService, deleteCartsProductsService } from '../../services/servicesCarts/cartServices.js'

//Controller con GET
const cartControllerGet = async (req,res)=>{
    try{
        const cartsResponse = await getCartsService(req);
        res.send(cartsResponse);
    }
    catch(err){
        console.log(err);
    }
};

const cartControllerPost = async (req,res) =>{
    try{
        if(req.params.cid){
           const cartPost = await postCartsProductsService(req);
           res.send(cartPost);
        }
        else{
            const cartPost = await postCartsService(req);
            res.send(cartPost);
        }
    }
    catch(err){
        console.log(err)
    }
};

const cartControllerDelete = async (req,res) => {
    try{
        const cartsResponse = await deleteCartsService(req);
        res.send(cartsResponse);
    }
    catch(err){
        console.log(err)
    }
};

const cartControllerProductDelete = async (req,res) => {
    try{
        const cartsResponse = await deleteCartsProductsService(req);
        res.send(cartsResponse);
    }
    catch(err){
        console.log(err)
    }
};


export { cartControllerGet, cartControllerPost,cartControllerDelete, cartControllerProductDelete };