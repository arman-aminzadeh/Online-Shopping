const Product = require("../models/product");
const Review = require("./../models/review");

exports.getAllReviews = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const reviews = await Review.find(filter);
    res.status(200).json({
      status: "Success",
      data: {
        reviews,
      },
    });
  } catch (err) {
    console.error(err);
  }
  next();
};

exports.createReview = async (req, res, next) => {
  try {
    // allow nested routes
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;
    const product = await Product.findById(req.params.productId);
    console.log(product);
    console.log(product.id);
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
