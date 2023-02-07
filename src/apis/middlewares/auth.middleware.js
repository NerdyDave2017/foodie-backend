const jwt = require("jsonwebtoken");

// Middleware to verify Authenticated user API calls.
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.authUserId = decoded;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({
      message: error.message,
    });
  }
};
