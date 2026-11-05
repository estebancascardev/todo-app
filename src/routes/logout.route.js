import {Router} from "express"; 
import { logoutController } from "../controllers/logout.controller.js";
const logoutRouter = Router();

logoutRouter.get("/", logoutController);

export default logoutRouter;
