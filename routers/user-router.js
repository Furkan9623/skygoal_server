const express = require("express");
const {
  REGISTER_USER,
  LOGIN_USER,
  USER_DETAILS,
  SKYGOAL,
} = require("../controllers/user-controller");
const upload = require("../middleware/multer-middleware");
const Authorization = require("../middleware/authorization-middleware");
const user_router = express.Router();
// register || POST REQUEST
user_router.post("/register", upload.single("photo"), REGISTER_USER);
// login || POST REQUEST
user_router.post("/login", LOGIN_USER);
// user-details
user_router.get("/user-details", Authorization, USER_DETAILS);
user_router.get("/sky", Authorization, SKYGOAL);
module.exports = user_router;
