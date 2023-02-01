import axios from "axios";
//const Stripe = require("stripe");

const stripe = Stripe(
  "pk_test_51MNiROHGdPw4SClZ4zaDLGoa02tnuRV2yluNpIeZ1FYOpHRrcfp6q1oLwsSgWn4am58mnICyk0r5LCvwgnRP5pFI00eQNyHTly"
);

export const buyProduct = async (productId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${productId}`
    );
    console.log("before redirection....", session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
