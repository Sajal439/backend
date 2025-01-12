// require("dotenv").config({path:"./env"})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

connectDB();

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
