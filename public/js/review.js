import axios from "axios";
import { showAlert } from "./alert";

export const submitReview = async (review) => {
  const currentUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    "/api/v1" +
    window.location.pathname;
  console.log(currentUrl);
  try {
    const res = await axios({
      method: "POST",
      url: `${currentUrl}/reviews `,
      data: {
        review,
      },
    });

    console.log(res.data.status);
    if (res.data.status === "Success") {
      showAlert("success", "Your Review Submited!");
      window.setTimeout(() => {
        location.assign("/");
      }, 3000);
    } else {
      showAlert("error", "Try Again!");
    }
  } catch (err) {
    showAlert("error", "Try Again!");
  }
};
