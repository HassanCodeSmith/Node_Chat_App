import { Router } from "express";
import {
  accountActivation,
  login,
  signup,
} from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/account-activation").post(accountActivation);

export { authRouter };
