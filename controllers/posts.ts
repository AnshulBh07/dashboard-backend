import Post from "../models/posts";
import { Request, Response } from "express";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const data = await Post.find({});
    // console.log(data);

    res.send(data).status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
