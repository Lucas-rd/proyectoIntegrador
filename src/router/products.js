import express from 'express';
import { productControllerGet, productControllerPost, productControllerPut, productControllerDelete } from '../controllers/controllersProducts/controller.js';
import { validAdmin } from '../utils/utils.js';

const router = express.Router();

//routers de Productos
router.get('/:pid?', productControllerGet);
router.post('/', validAdmin, productControllerPost);
router.put('/:pid', validAdmin, productControllerPut);
router.delete('/:pid', validAdmin, productControllerDelete);
export default router;
