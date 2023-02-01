const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//const stripe = require("stripe")(
//  "sk_test_51MNiROHGdPw4SClZgdwvFfNRgpmNCuydWKjKdxmXXxCGU246KPsZMLuS7SPIhTGcvBwMF1ODrf9816wlcJmqfY1k00KtjeaIbF"
//);
const Product = require("../models/product");

exports.getCheckOutSession = async (req, res, next) => {
  // Get the currently booked product
  try {
    const product = await Product.findById(req.params.productId);
    console.log(product.title);
    console.log(product.price);
    // create check out session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: req.user.email,
      client_reference_id: req.params.productId,
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: `${product.title}`,
            },
            unit_amount: 49 * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/tours/${product.id}`,
    });
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   success_url: `${req.protocol}://${req.get("host")}/`,
    //   cancel_url: `${req.protocol}://${req.get("host")}/tours/${product.id}`,
    //   customer_email: req.user.email,
    //   client_reference_id: req.params.productId,
    //   line_items: [
    //     {
    //       name: `${product.title}`,
    //       //images: product.imageCover,
    //       // price_data: 49 * 100,
    //       currency: "usd",
    //       quantity: 1,
    //     },
    //   ],
    // });
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
