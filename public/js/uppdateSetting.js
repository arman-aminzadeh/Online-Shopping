import axios from "axios";
import { showAlert } from "./alert";

export const uppdateData = async (data) => {
  console.log(data);
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMe",
      data,
    });
    console.log(res.data.status);
    if (res.data.status === "Success") {
      showAlert("success", "Data updated successfully!");
    }
  } catch (err) {
    showAlert("error", "Faild to updated!");
  }
};

export const uppdatePassword = async (
  passwordCurrent,
  password,
  confirmPassword
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMyPassword",
      data: {
        passwordCurrent,
        password,
        confirmPassword,
      },
    });
    console.log("working till here!!");
    console.log(res.data.status);
    if (res.data.status === "success") {
      showAlert("success", "PASSWORD updated successfully!");
    }
  } catch (err) {
    showAlert("error", "Faild to updated!");
  }
};
