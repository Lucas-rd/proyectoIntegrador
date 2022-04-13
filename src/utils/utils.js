import {fileURLToPath} from 'url';
import { dirname } from 'path';

const admin = true;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const validAdmin = async (req, res, next) => {
    if (admin) next();
    else
        res.send({ 
            error : -1,
            descripcion:`Este usuario no tiene los permisos para realizar esta operacion`
        })
};

export { __dirname, validAdmin };
