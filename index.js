import app from "./app.js";
import http from "http";

const server = http.createServer(app);
const PORT = Number(process.env.DB_PORT);

server.listen(PORT, ()=>{
    console.log(`El servidor está escuchando en el puerto ${PORT}`)
});