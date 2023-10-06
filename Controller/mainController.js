const express = require("express");
const router = express.Router();
const model = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// let checkrole = async (req, res, next) => {
//   const passwordMatch = await bcrypt.compare(req.body.role, "admin");
//   console.log(passwordMatch);
//   console.log(req.body.role);
// };
let checkrole = async (req, res, next) => {
  const isRoleMatch = await bcrypt.compare("admin", req.body.role);

  if (isRoleMatch) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. User does not have admin role." });
  }
};

router.post("/adddata", checkrole, (req, res) => {
  console.log(req.body);
  const { name, value1, value2, operator, role } = req.body;
  let result = 0;
  switch (operator) {
    case "+":
      result = value1 + value2;
      break;
    case "-":
      result = value1 - value2;
      break;
    case "*":
      result = value1 * value2;
      break;
    case "/":
      result = value1 / value2;
      break;
    default:
      result = 0;
  }
  // Generate the hash asynchronously
  const salt = 10;
  bcrypt.hash(role, salt, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      let data = new model({
        name: name,
        value1: value1,
        value2: value2,
        operator: operator,
        result: result,
        role: hash,
      });
      data.save();
      res.send(data);
    }
  });
});

router.post("/updatedata/:id", checkrole, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  let result = 0;
  const { name, value1, value2, operator } = req.body;
  switch (operator) {
    case "+":
      result = value1 + value2;
      break;
    case "-":
      result = value1 - value2;
      break;
    case "*":
      result = value1 * value2;
      break;
    case "/":
      result = value1 / value2;
      break;
    default:
      result = 0;
  }
  const updateddata = {
    $set: {
      name: name,
      value1: value1,
      value2: value2,
      result: result,
      operator: operator,
    },
  };
  console.log(updateddata);
  await model.updateOne(filter, updateddata);
  const updateddatas = await model.findOne({ _id: id }).exec();
  res.send(updateddatas);
});

router.delete("/delete/:id", checkrole, async (req, res) => {
  let id = req.params.id;
  await model.deleteOne({ _id: id });
  res.send("data updated successfully");
});

module.exports = router;
