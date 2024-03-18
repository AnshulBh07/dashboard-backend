import { Response, Request } from "express";
import User from "../models/users";
import md5 from "md5";
import { IUser } from "../interfaces";

// function to find user
export const findUser = async (req: Request, res: Response) => {
  try {
    // we receive email in request params, email is unique
    const { email } = req.query;

    if (email === "" || typeof email !== "string") {
      res.status(400).send("Invalid data.");
      return;
    }

    const user = await User.findOne({ email: String(email) });

    // if the user is not present
    if (user !== null) {
      res.status(200).send("User already exists, please login.");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(500).send("Internal server error!");
    console.error(err);
  }
};

export const insertUser = async (req: Request, res: Response) => {
  try {
    // we get first name, last name, password, email in body
    const { first_name, last_name, email, password } = req.body;

    // check for validity of all
    if (
      first_name === "" ||
      typeof first_name !== "string" ||
      last_name === "" ||
      typeof last_name !== "string" ||
      email === "" ||
      typeof email !== "string" ||
      password === "" ||
      typeof password !== "string"
    ) {
      res.status(400).send("Invalid inputs");
      return;
    }

    // hash password before inserting in db
    const encrypted_pwd = md5(password);
    const userObj: IUser = {
      email: email,
      password: encrypted_pwd,
      first_name: first_name,
      last_name: last_name,
    };

    const newUser = new User(userObj);
    await newUser.save();

    res.status(200).send("User successfully registered!");
  } catch (err) {
    res.status(500).send("Internal server error.");
    console.error(err);
  }
};
