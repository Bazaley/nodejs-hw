import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import contactsRouter from "./src/routes/api/contacts.js";
import { errorHandler } from "./src/helpers/apiHelpers.js";
import "./src/config/config-passport.js";
import authRouter from "./src/routes/api/authRouter.js";

dotenv.config();

export const app = express();
export const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/users", authRouter);

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);
