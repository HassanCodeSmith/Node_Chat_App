import { Router } from "express";
import { singup } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.route("/signup").post(singup);

export { authRouter };
