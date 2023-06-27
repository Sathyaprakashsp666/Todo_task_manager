const jwt = require("jsonwebtoken");
const User = require("../../models/users.model");

// Middleware for authentication and authorization
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: "Please provide token!" });
    }

    const decoded = jwt.verify(token, "secretKey");
    // console.log("decopded" + decoded);
    const user = await User.findById(decoded.userId);
    // console.log(user);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token!" });
  }
};
