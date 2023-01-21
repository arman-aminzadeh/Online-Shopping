import axios from "axios";
import { showAlert } from "./alert";

export const signUpUser = async (
  username,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/signup",
      data: {
        username,
        email,
        password,
        confirmPassword,
      },
    });
    console.log("working till here 2 ....");
    console.log(res.data.status);
    if (res.data.status === "sucess") {
      showAlert("success", "Signed Up Successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    } else {
      showAlert("error", "Try Again:::::!");
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Try Again!:::::");
  }
};
