import {Router} from "express";
import { todosController, createTodoController, deleteTodoController, patchTodoController } from "../controllers/todos.controller.js";
const todosRouter = Router();

todosRouter.get("/", todosController);
todosRouter.post("/", createTodoController);
todosRouter.delete("/:id", deleteTodoController);
todosRouter.patch("/:id", patchTodoController);


export default todosRouter;