const bcrypt = require("bcrypt");
const HashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((res) => res)
    .catch((er) => er);
};
const MatchPassword = async (password, hashPassword) => {
  return bcrypt
    .compare(password, hashPassword)
    .then((res) => res)
    .catch((er) => er);
};
module.exports = { HashPassword, MatchPassword };
