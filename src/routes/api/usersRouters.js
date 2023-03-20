import { Router } from "express";
import {
  signup,
  login,
  logout,
  current,
  changeAvatarController,
} from "../../controllers/userControllers.js";
import { userValidation } from "../../middlewares/validationMiddlewares.js";
import { auth } from "../../middlewares/auth.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { uploadMiddleware } from "../../middlewares/fileMiddleware.js";

const router = Router();

router.post("/signup", userValidation, signup);
router.post("/login", userValidation, login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch(
  "/avatars",
  auth,
  uploadMiddleware.single("avatar"),
  asyncWrapper(changeAvatarController)
);

export default router;
