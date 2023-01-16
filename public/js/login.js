import axios from "axios";
import { showAlert } from "./alert";

export const login = async (username, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        username,
        password,
      },
    });
    console.log(res.data.status);
    if (res.data.status === "success") {
      showAlert("success", "Logged in Successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    } else {
      showAlert("error", "Incorrect username or password!");
    }
  } catch (err) {
    showAlert("error", "Incorrect username or password!");
  }
};

export const logOut = async () => {
  console.log("log out working!!!");
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/users/logout",
    });
    console.log(res.data.status);
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    showAlert("error", "Error Logging out! Try again!");
  }
};
