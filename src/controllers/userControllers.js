import { User } from "../db/userModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    res.status(401).json({ message: "Email or password is wrong" });
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

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ code: 409, message: "Email in use" });
  }

  const newUser = new User({ email, password, name });
  newUser.setPassword(password);
  newUser.save();

  res.json({
    code: 201,
    user: { email: newUser.email, subscription: newUser.subscription },
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
