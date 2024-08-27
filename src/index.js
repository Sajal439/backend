// require('dotenv').config({path: './.env'});

import dotenv from "dotenv";
import connectDB from "./db/index.js";

// this is another approach

dotenv.config({
  path: "./.env",
});

connectDB();

/*
// this is one approach

import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
})();
*/
