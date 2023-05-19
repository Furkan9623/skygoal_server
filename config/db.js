const mongoose = require("mongoose");
const ConnectDB = async () => {
  const mongodb_URL = process.env.mongoUrl;
  mongoose
    .connect(mongodb_URL, { useNewUrlParser: true })
    .then((res) => console.log(`db connect ${res.connection.db.databaseName}`))
    .catch((er) => console.log(`db not connect ${er}`));
};
module.exports = ConnectDB;
