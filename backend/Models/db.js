const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)

  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb connection failed");
  });
