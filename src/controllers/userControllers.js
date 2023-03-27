import { User } from "../db/userModel.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../helpers/sendEmail.js";

dotenv.config();

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  const avatarURL = gravatar.url(email, { protocol: "https", s: "250" });

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ code: 409, message: "Email in use" });
  }

  const verificationToken = uuidv4();

  const newUser = new User({
    email,
    password,
    name,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({
    code: 201,
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
};

export const resendingEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (!user.verificationToken) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  if (!user.verify) {
    res.status(401).json({ message: "Verify your mail" });
    return;
  }

  const { _id: id } = user;

  const token = await jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const logout = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204);
};

export const current = async (req, res, next) => {
  res.json({ email: req.user.email, subscription: req.user.subscription });
};

export const changeAvatarController = async (req, res, next) => {
  const { filename, path } = req.file;

  const file = await Jimp.read(path);
  file.resize(250, 250).write(`./public/avatars/${filename}`);

  await User.findByIdAndUpdate(req.user._id, {
    avatarURL: filename,
  });

  fs.unlink(path, () => {});

  res.json({
    avatarURL: filename,
  });
};
