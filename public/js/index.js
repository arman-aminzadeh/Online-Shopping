import "@babel/polyfill";
import { login, logOut } from "./login";
import { imageChanger } from "./imageChange";
import { uppdateData } from "./uppdateSetting";
import { uppdatePassword } from "./uppdateSetting";
import { submitReview } from "./review";
import "core-js";

// values
// document.querySelector('form').getElementsByClassName('review').review.value
const mainImage = document.getElementById("main-img");
const smallPic = document.getElementsByClassName("small-pic");
const loginForm = document.querySelector(".login-form");
const logOutBtn = document.querySelector(".btn-log-out");
const userUpdateData = document.querySelector(".user-update");
const updatePasswordForm = document.querySelector(".password-change");
const reviewBtn = document.querySelector("form");

if (smallPic & mainImage) {
  imageChanger(smallPic, mainImage);
}

if (reviewBtn) {
  reviewBtn.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const review = reviewBtn.getElementsByClassName("review").review.value;
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
  updatePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const passwordCurrent =
      updatePasswordForm.querySelector(".current-pass").value;
    const password = updatePasswordForm.querySelector(".new-pass").value;
    const passwordConfirm =
      updatePasswordForm.querySelector(".new-pass-confirm").value;
    console.log(passwordCurrent, password, passwordConfirm);
    uppdatePassword(passwordCurrent, password, passwordConfirm);
  });
}

// passwordCurrent, password, passwordConfirm;
