import axios from "axios";
import { showAlert } from "./alert";

export const signUpUser = async (data) => {
  try {
    console.log(data);
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/signup",
      data,
    });
    console.log(data);
    console.log(res.data.status);
    if (res.data.status === "success") {
      showAlert("success", "Signed Up Successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    } else {
      showAlert("error", "Try Again:::::!");
    }
  } catch (err) {
    showAlert("error", "Try Again!:::::");
  }
};
