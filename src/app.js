import express from 'express';
import productRouter from './router/products.js';
import cartRouter from './router/carts.js'
//import __dirname from '../utils/utils.js';


const app = express();
//const admin = true;
//app.use(express.static(__dirname+'/public'));

const server = app.listen(8080, ()=>{
    console.log('Listening on PORT 8080')
});

app.use(express.json());

app.use('/api/products',productRouter);
app.use('/api/carts', cartRouter);
