const express = require("express");
const router = express.Router();
const viewsController = require("./../controllers/viewsController");
const reviewsController = require("./../controllers/reviewsController");
const authController = require("./../controllers/authController");

router.use(authController.isLoggedIn);

router.get("/", viewsController.getLandingPage);
router.get("/me", viewsController.getMe);
router.get("/products/:id", viewsController.getProduct);
router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);

router.post(
  "products/:productId/reviews",
  authController.protect,
  viewsController.createReview
);

//router.route("/signup").get(authController.getSignupUser);
//router.route("/signup").post(authController.signupUser);
router.route("/login").get(viewsController.getLoginform);
router.route("/signup").get(viewsController.getSignUpform);
//router.route("/logout").get(authController.getLogOut);
//router.route("/login").post(authController.loginUser);

module.exports = router;
