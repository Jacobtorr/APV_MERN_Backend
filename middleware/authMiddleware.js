import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    
    let token;

    // Comprobar la sesion a traves de un Token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // Inicia la sesion si el token es valido
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado");

            return next();

        } catch (error) {
            // Error, token no valido, no inicia la sesion
            const err = new Error('Token no valido');
            return res.status(403).json({msg: err.message});
        }
    } 

    if(!token) {
        // Si no hay token
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({msg: error.message})
    }

    next();
}

export default checkAuth;