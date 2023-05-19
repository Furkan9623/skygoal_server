const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const express = require("express");

// const user_router = require("../routers/user-router");
const user_router = require("./routers/user-router");
const ConnectDB = require("./config/db");
ConnectDB();
const app = express();
// middle ware
app.use(express.json());
app.use(cors());
// router
app.use("/api/v1", user_router);
app.use("/upload", express.static("./uploads"));
const PORT = process.env.SERVER_PORT;
const server = app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
// when server connected then this will run
server.on("listening", () => {
  console.log(`server connected`);
});
// when get any error during server run then this will print
server.on("error", (error) => {
  console.log(`error during server connect ${error}`);
});
