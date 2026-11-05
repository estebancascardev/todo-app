import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginController = async (_req, res) => {
    const {email, password} = _req.body;
    const userExists = await User.findOne({email});

    if (!userExists){
        return res.status(400).json({error: "Email o contraseña incorrectos."});
    };

    if (!userExists.verified){
        return res.status(400).json({error: "Por favor, verifica tu correo electrónico antes de iniciar sesión."});
    };

    const isCorrect = await bcrypt.compare(password, userExists.passwordHash);
    
    if (!isCorrect){
        return res.status(400).json({error: "Email o contraseña incorrectos."});
    };

    const userForToken = {
        id: userExists.id,
    };

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

    res.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 día
        secure: process.env.PAGE_URL === "production", // Solo enviar cookie a través de HTTPS en producción
        httpOnly: true, // Evitar que la cookie sea accesible desde JavaScript
    });

    return res.sendStatus(200);
};