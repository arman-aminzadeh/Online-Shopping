import "@babel/polyfill";
import { login, logOut } from "./login";
import { signUpUser } from "./signUpUser";
import { imageChanger } from "./imageChange";
import { uppdateData } from "./uppdateSetting";
import { uppdatePassword } from "./uppdateSetting";
import { submitReview } from "./review";
import { buyProduct } from "./stripe";
import "core-js";

// values
// document.querySelector('form').getElementsByClassName('review').review.value
const mainImage = document.getElementById("main-img");
const smallPic = document.getElementsByClassName("small-pic");
const loginForm = document.querySelector(".login-form");
const logOutBtn = document.querySelector(".btn-log-out");
const userUpdateData = document.querySelector(".user-update");
const updatePasswordForm = document.querySelector(".user-pass-update");
const reviewForm = document.querySelector(".review-form");
const signUpForm = document.querySelector(".sign-up-form");
const buyProductBtn = document.querySelector(".buy-btn");

if (smallPic & mainImage) {
  imageChanger(smallPic, mainImage);
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const review = reviewForm.getElementsByClassName("review").review.value;
    console.log(review);
    submitReview(review);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    login(username, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener("click", logOut);

if (userUpdateData) {
  userUpdateData.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("username", userUpdateData.username.value);
    form.append("email", userUpdateData.email.value);
    form.append("photo", userUpdateData.photo.files[0]);
    console.log(form);
    uppdateData(form);
  });
}
if (updatePasswordForm) {
  updatePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passwordCurrent = updatePasswordForm.currentPassword.value;
    const password = updatePasswordForm.newPassword.value;
    const confirmPassword = updatePasswordForm.newPasswordConfirm.value;
    await uppdatePassword(passwordCurrent, password, confirmPassword);
    (updatePasswordForm.currentPassword.value = ""),
      (updatePasswordForm.newPassword.value = ""),
      (updatePasswordForm.newPasswordConfirm.value = "");
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;
    const confirmPassword = signUpForm.confirmPassword.value;
    const form = new FormData();
    signUpUser(username, email, password, confirmPassword);
  });
}

if (buyProductBtn) {
  buyProductBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing..";
    const productId = e.target.dataset.productId;
    buyProduct(productId);
  });
}
// passwordCurrent, password, passwordConfirm;
