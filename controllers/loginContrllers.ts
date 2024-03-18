import { Request, Response } from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import User from "../models/users";

export const loginUser = async (req: Request, res: Response) => {
  try {
    // we first authenticate received password with password in database
    // if they match we generate access and refresh tokens for user
    const { email, password } = req.body;

    if (
      email === "" ||
      typeof email !== "string" ||
      password === "" ||
      typeof password !== "string"
    ) {
      res.status(400).send("Invalid inputs.");
      return;
    }

    const encrypted_pwd = md5(password);

    const user = await User.findOne({ email: String(email) });

    if (user === null) {
      res.status(404).send("User not found. Please sign up!");
      return;
    }

    if (user.password !== encrypted_pwd) {
      res.status(401).send("Invalid Password.");
      return;
    }

    const accessKey = process.env.JWT_ACCESS_KEY || "";
    const payload = { user_id: user._id, email: user.email };
    const access_token = jwt.sign(payload, accessKey, { expiresIn: "1h" });

    const refreshKey = process.env.JWT_REFRESH_KEY || "";
    const refresh_token = jwt.sign(payload, refreshKey, { expiresIn: "7d" });

    res
      .status(200)
      .send({ access_token: access_token, refresh_token: refresh_token });
  } catch (err) {
    res.status(500).send("Internal server error.");
    console.error(err);
  }
};
