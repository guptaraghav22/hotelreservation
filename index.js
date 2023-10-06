const express = require("express");
const dotenv = require("dotenv").config();
const database = require("./Config/database");
const data = require("./Models/userSchema");
const maincontroller = require("./Controller/mainController");
const app = express();
app.use(express.json());
app.use("/operations", maincontroller);

app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
});
