import { Router } from "express";
import {
  signup,
  login,
  logout,
  current,
} from "../../controllers/userControllers.js";
import { userValidation } from "../../middlewares/validationMiddlewares.js";
import { auth } from "../../middlewares/auth.js";

const router = Router();

router.post("/signup", userValidation, signup);
router.post("/login", userValidation, login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);

export default router;
