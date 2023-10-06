const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
function verifyUser(req, res, next) {
  const user = req.body.role;
  bcrypt.compare(user.role);
}
