const { HashPassword, MatchPassword } = require("../helpers/hash-password");
const UserModel = require("../models/user-schema");
const { GENERATE_TOKEN } = require("../helpers/jwt-token");
// REGISTER USER || POST
const REGISTER_USER = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = JSON.parse(req.body.user);
  const { filename } = req.file || {};
  if (!name || !email || !password) {
    return res.status(404).json({
      success: false,
      message: "please fill all the details..",
    });
  }
  try {
    const userAlreadyExist = await UserModel.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: true,
        message: "user already exist..",
      });
    }
    const hashPassword = await HashPassword(password);
    const user = new UserModel({
      name,
      email,
      imgUrl: filename,
      password: hashPassword,
    });
    const newUser = await user.save();
    return res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN || POST
const LOGIN_USER = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "please fill all the detailsss.",
    });
  }
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "user doest not exist",
      });
    }
    const matchPassword = await MatchPassword(password, existUser.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter invalid password",
      });
    }
    const token = await GENERATE_TOKEN(existUser._id);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

// user - details ||
const USER_DETAILS = async (req, res) => {
  const id = req.UserId;
  try {
    const user = await UserModel.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.imgUrl,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const SKYGOAL = async (req, res) => {
  const id = req.UserId;
  try {
    const user = await UserModel.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { REGISTER_USER, LOGIN_USER, USER_DETAILS, SKYGOAL };
