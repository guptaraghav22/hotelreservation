const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  value1: {
    type: Number,
  },
  value2: {
    type: Number,
  },
  operator: {
    type: String,
  },
  result: {
    type: Number,
  },
  role: {
    type: String,
  },
});

const Data = mongoose.model("Data", schema);

module.exports = Data;
