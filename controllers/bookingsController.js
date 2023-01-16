const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51MNiROHGdPw4SClZgdwvFfNRgpmNCuydWKjKdxmXXxCGU246KPsZMLuS7SPIhTGcvBwMF1ODrf9816wlcJmqfY1k00KtjeaIbF"
);
const Product = require("../models/product");

exports.getCheckOutSession = async (req, res, next) => {
  // Get the currently booked product
  try {
    const product = await Product.findById(req.params.productId);
    // create check out session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/tours/${product.id}`,
      customer_email: req.user.email,
      client_reference_id: req.params.productId,
      line_items: [
        {
          name: `${product.title}`,
          description: product.description,
          //images: product.imageCover,
          //amount: product.price * 100,
          amount: 49.5 * 100,
          currency: "usd",
          quantity: 1,
        },
      ],
    });
    // create session as response
    res.status(200).json({
      status: "success",
      session,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};
