const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/HotelReservation");

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", function () {
  console.log("Connected successfully");
});

module.exports = connection;
