const User = require("../models/user");
const Product = require("./../models/product");

exports.getLandingPage = async (req, res, next) => {
  const products = await Product.find();
  //const user = await User.findById(req.user.id);

  res.render("products", { products });
  next();
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "reviews",
    fields: "review rating user",
  });
  res.render("product", { product });
  next();
};

exports.getSignupUser = (req, res) => {
  res.render("partials/signup");
};
exports.getLoginform = (req, res) => {
  res.status(200).render("login");
};

exports.getMe = (req, res) => {
  res.render("me");
};
exports.updateUserData = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      username: req.body.username,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  res.render("me", { user: updatedUser });
};

exports.createReview = async (req, res, next) => {
  try {
    // allow nested routes
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (err) {
    console.error(err);
  }
  next();
};