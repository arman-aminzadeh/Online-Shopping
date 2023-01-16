const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");

router.get("/Me", authController.protect, usersController.getMe);
router.patch(
  "/updateMe",
  authController.protect,
  usersController.uploadUserPhoto,
  usersController.updateMe
);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router
  .route("/deleteMe")
  .delete(authController.protect, usersController.deleteMe);

router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logOutUser);
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
