import express from "express";
import path from "path";

const router = express.Router();
const FILE_DIR = path.resolve("./public/avatars");

router.use("/", express.static(FILE_DIR));

export default router;
