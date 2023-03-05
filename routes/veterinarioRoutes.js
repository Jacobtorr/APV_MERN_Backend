import express from "express";
import { 
    registrar, 
    confirmar, 
    autenticar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword, 
    perfil,
    editarPerfil,
    passwordPerfil
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Area Publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

// Area privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, editarPerfil);
router.put('/password-perfil', checkAuth, passwordPerfil);

export default router;