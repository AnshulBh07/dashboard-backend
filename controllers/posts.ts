import Post from "../models/posts";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
import dotenv from "dotenv";

dotenv.config();

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const authorizationHeaders = req.headers["authorization"];
    // if they don't exist
    if (
      authorizationHeaders === "" ||
      typeof authorizationHeaders !== "string"
    ) {
      res.status(400).send("Bad request.");
      return;
    }

    const tokens = JSON.parse(authorizationHeaders.split(" ")[1]);
    let access_token = tokens.access_token;
    const refresh_token = tokens.refresh_token;

    // verify access token by matching payload info with info in database
    const decoded = jwt.decode(access_token, { complete: true }) as JwtPayload;
    const { payload } = decoded;

    const user = await User.findOne({ _id: payload.user_id });
    // console.log(user);

    if (user === null || user.email !== payload.email) {
      res.status(401).send("Unauthorized, please login again.");
      return;
    }

    // 1. check for expiry of token, if access token is expired refresh it using refresh token,
    //  if refresh token is expired as well send back an error status and ask for login again
    const currTime = Date.now() / 1000;

    if (decoded) {
      if (decoded.exp && decoded.exp < currTime) {
        // refresh if refresh token valid
        const refresh_decoded = jwt.decode(refresh_token, {
          complete: true,
        }) as JwtPayload;

        if (
          typeof refresh_token !== "string" ||
          (refresh_decoded.exp && refresh_decoded.exp < currTime)
        ) {
          res.status(401).send("Unauthorized, please login again.");
          return;
        }

        const accessKey = process.env.JWT_ACCESS_KEY || "";
        access_token = jwt.sign(payload, accessKey, { expiresIn: "1h" });
      }
    }

    const data = await Post.find({});
    // console.log(data);

    res
      .send({
        posts: data,
        access_token: access_token,
        refresh_token: refresh_token,
      })
      .status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};
