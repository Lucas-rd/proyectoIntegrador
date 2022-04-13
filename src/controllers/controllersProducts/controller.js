import express from 'express';
import { getProductsService, postProductsService, putProductsService, deleteProductsService } from '../../services/servicesProducts/productsService.js';
import fs from 'fs';


//Controller de GET
const productControllerGet = async (req, res) =>{
    try{
        //Aca traigo la data del id que ponga el usuario
        if(req.params.pid){
            const productsResponse = await getProductsService(req);
            const productosFiltrados = productsResponse.filter(e =>{
               return e.id == req.params.pid
            })

            res.send(productosFiltrados)
            
        }
        else{
            //Aca traigo toda la data 
            const productsResponse = await getProductsService(req);
            res.send(productsResponse);
        }    
    }
    catch (err){
        console.log(err);
    };
};

//Controller de POST
const productControllerPost = async (req, res) =>{
    try{
        const productPost = await postProductsService(req);
        res.send(productPost);
    }
    catch(err){
        console.log(err)
    };
};

//Controller de PUT
const productControllerPut = async (req, res)=>{
    try{
        const productPut = await putProductsService(req);
        res.send(productPut);
    }
    catch(err){
        console.log(err)
    };
};

const productControllerDelete = async (req,res)=>{
    try{
        const productDelete = await deleteProductsService(req);
        res.send(productDelete);
    }
    catch(err){
        console.log(err)
    }
}

export {productControllerGet, productControllerPost, productControllerPut, productControllerDelete};
