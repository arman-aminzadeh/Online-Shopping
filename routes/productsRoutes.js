const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");
const reviewsRoutes = require("./reviewsRoutes");

router.use("/:productId/reviews", reviewsRoutes);
router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route("/:id")
  .get(authController.protect, productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(
    authController.protect,
    authController.ristrictTo("admin"),
    productsController.deleteProduct
  );

module.exports = router;
