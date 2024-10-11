import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { emailValidation } from "../middlewares/emailValidation.middleware.js";
import { upload } from "../utils/upload.util.js";
import { trimObjects } from "../middlewares/trimObjects.middleware.js";
const router = Router();

router.use("/auth", upload.none(), trimObjects, emailValidation, authRouter);

export { router };
