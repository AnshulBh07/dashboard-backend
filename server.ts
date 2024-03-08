import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { socialMediaPosts } from "./data/postsData";
import Post from "./models/posts";
import postRoutes from "./routes/posts";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.port || 3001;

// initializes db with data we have currently
app.get("/", async (req: Request, res: Response) => {
  try {
    const count = await Post.countDocuments({});
    // console.log(count);

    // insert initial if the collection is empty
    if (count === 0) {
      socialMediaPosts.forEach(async (post) => {
        const newPost = new Post(post);
        await newPost.save();
      });
    }
    res.send("On the server!").status(200);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// remember to use app.use() method not get ot post
// this below is the root path, we can form diverging paths/routes from here defined in routes folder
app.use("/posts", postRoutes);

// function to connect to mongodb atlas db
const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anshulbh009:social1999@social-dashboard.xgfjes3.mongodb.net/"
    );
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

main();
