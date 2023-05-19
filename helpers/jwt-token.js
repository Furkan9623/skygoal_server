const JWT = require("jsonwebtoken");
const GENERATE_TOKEN = async (id) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    const token = JWT.sign({ id }, SECRET_KEY, { expiresIn: "2d" });
    return token;
  } catch (error) {
    return error;
  }
};
module.exports = { GENERATE_TOKEN };
