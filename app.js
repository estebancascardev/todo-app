import "dotenv/config";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import dns from "dns";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import usersRouter from "./src/routes/user.route.js";
import loginRouter from "./src/routes/login.route.js";
import todosRouter from "./src/routes/todos.route.js";
import logoutRouter from "./src/routes/logout.route.js";    
import userExtractor from "./middleware/auth.js";
import {MONGO_URI} from "./config.js";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();

(async() => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Conectado a MongoDB");
    }catch (error){
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.resolve("views", "home")));
app.use("/styles", express.static(path.resolve("views", "styles")));      
app.use("/signup", express.static(path.resolve("views", "signup")));
app.use("/login", express.static(path.resolve("views", "login")));
app.use("/todos", express.static(path.resolve("views", "todos")));
app.use("/components", express.static(path.resolve("views", "components")));
app.use("/verify/:id/:token", express.static(path.resolve("views", "verify")));
app.use("/images", express.static(path.resolve("img")));
app.use("/src", express.static(path.resolve("src")));

//Rutas backend
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/todos", userExtractor, todosRouter);

app.use(morgan("tiny"));  

export default app;