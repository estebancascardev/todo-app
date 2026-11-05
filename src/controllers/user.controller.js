import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import {PAGE_URL} from '../../config.js';

export const usersController = async (_req, res) => {
    const {name, email, password} = _req.body;
    if (!name || !email || !password){
        return res.status(400).json({error: "Todos los espacios son requeridos"});
    }

    const userExists = await User.findOne({email});

    if (userExists){
        return res.status(400).json({error: "El correo electrónico ya está registrado"});
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const newUser = new User({
        name,
        email,
        passwordHash,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedUser.email, 
        subject: "Verificación de usuario", 
        html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`,
    });

    return res.status(201).json({data: "Usuario creado exitosamente. Por favor, verifica tu correo electrónico."});
};

export const verifyUserController = async (_req, res) => {
    try{
        const token = _req.params.token;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decodedToken.id;
        await User.findByIdAndUpdate(id, {verified: true});
        return res.sendStatus(200);
    } catch (error){
        const id = _req.params.id;
        const {email} = await User.findById(id);
        const token = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, 
        subject: "Verificación de usuario", 
        html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`,
    });

        return res.status(400).json({error: "Token inválido o expirado. Se ha enviado un nuevo correo de verificación."});
    }
};

