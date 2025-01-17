// require("dotenv").config({path:"./env"})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed!!!", err);
  });

/*
// Approach 1

import express from "express";
port = process.env.PORT;
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`APP is listening on port ${port} `);
    });
  } catch (error) {
    console.log("ERROR:", error);
  }
})();
*/
