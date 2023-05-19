const JWT = require("jsonwebtoken");
const Authorization = async (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization;
  console.log(token);
  try {
    const decode = JWT.verify(token, SECRET_KEY);
    console.log(decode);
    req.UserId = decode.id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = Authorization;
