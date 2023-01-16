const { promisify } = require("util");
const User = require("./../models/user");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bcrypt = require("bcryptjs");

exports.signupUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIERS_IN,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIERS_IN * 24 * 60 * 60 * 1000
      ),
    });
    newUser.password = undefined;
    res.status(201).json({
      status: "sucess",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.error(err);
  }
  next();
};

exports.loginUser = async (req, res, next) => {
  console.log("logiiing processing.....");
  try {
    // get the username and password
    const { username, password } = req.body;
    // check the username exist
    if (!username || !password) {
      return res.json({
        status: "fail",
        error: "username or password missing!!",
      });
    }
    // compare the passwords
    const user = await User.findOne({ username });
    if (!(await bcrypt.compare(password, user.password))) {
      return res.json({
        status: "fail",
        error: "username or password missing!!",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIERS_IN,
    });
    // console.log(comparePassword);
    // send token to the user
    // res.cookie("jwt", token, { httpOnly: true });
    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIERS_IN * 24 * 60 * 60 * 1000
      ),
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
    next();
  } catch (err) {
    console.error(err.message);
  }
};

exports.logOutUser = (req, res, next) => {
  res.cookie("jwt", "LogOutUser", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({
    status: "success",
  });
  next();
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new Error("your are not loged in!!");
    }
    const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error("the user no longer exist!!");
    }
    req.user = currentUser;
  } catch (err) {
    res.status(401).json({
      status: "fails",
      messsage: "your are not loged in!!",
    });
  }
  next();
};
// only for render pages, No error!!

exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decoded);
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    console.log(user);
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      throw new Error("Your current password is not correct!");
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // log in user again
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIERS_IN,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIERS_IN * 24 * 60 * 60 * 1000
      ),
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
    next();
  } catch (err) {
    console.error(err.message);
  }
};

exports.ristrictTo = (...roles) => {
  return (req, res, next) => {
    if (req.body.role === "admin") {
      throw new Error("you are not allowed to this action!!");
    }
    next();
  };
};
