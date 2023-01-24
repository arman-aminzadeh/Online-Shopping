import axios from "axios";

const stripe = Stripe(
  "pk_test_51MNiROHGdPw4SClZ4zaDLGoa02tnuRV2yluNpIeZ1FYOpHRrcfp6q1oLwsSgWn4am58mnICyk0r5LCvwgnRP5pFI00eQNyHTly"
);

export const buyProduct = async (productId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${productId}`
    );
    console.log(session);
    await stripe.redirectToCheckout({
      session: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
