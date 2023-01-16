const express = require("express");
const reviewsController = require("./../controllers/reviewsController");
const authController = require("./../controllers/authController");
const router = express.Router({ mergeParams: true });



router
  .route("/")
  .get(authController.protect, reviewsController.getAllReviews)
  .post(authController.protect, reviewsController.createReview);

module.exports = router;
