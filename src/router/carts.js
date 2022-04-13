import express from 'express';
import { cartControllerGet, cartControllerPost,cartControllerDelete, cartControllerProductDelete } from '../controllers/controllersCarts/controller.js';

const router = express.Router();

router.get('/:cid/products', cartControllerGet);
router.post('/', cartControllerPost);
router.post('/:cid/products', cartControllerPost);
router.delete('/:cid', cartControllerDelete);
router.delete('/:cid/products/:pid', cartControllerProductDelete);

export default router