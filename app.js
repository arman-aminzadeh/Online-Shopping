const fs = require("fs");
const express = require("express");
// start exprees app
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const viewsRoutes = require("./routes/viewsRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
app.use(
  helmet.contentSecurityPolicy({
    contentSecurityPolicy: false,
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],

      fontSrc: ["'self'", "https:", "data:"],

      scriptSrc: ["'self'", "unsafe-inline"],

      scriptSrc: ["'self'", "https://*.cloudflare.com"],

      scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],

      styleSrc: ["'self'", "https:", "unsafe-inline"],

      connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// data sanitization against No SQL query injections
app.use(mongoSanitize());
// data sanitization against XSS attackts
app.use(xss());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASS
);

mongoose.connect(DB, () => {
  console.log("DB successfully connected ....");
});

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/bookings", bookingsRoutes);

app.listen(3000, console.log("App running on 3000 port..."));
