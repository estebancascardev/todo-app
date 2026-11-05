import {Router} from "express";
import {usersController, verifyUserController} from "../controllers/user.controller.js"
const usersRouter = Router();

usersRouter.post("/", usersController);
usersRouter.patch("/:id/:token", verifyUserController);

export default usersRouter;