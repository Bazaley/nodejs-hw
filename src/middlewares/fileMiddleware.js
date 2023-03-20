import path from "path";
import multer from "multer";
import md5 from "md5";

const AVATAR_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");

    const fileName = `${md5(req.user.email)}.${extension}`;

    cb(null, fileName);
  },
});

export const uploadMiddleware = multer({ storage });
