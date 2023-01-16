const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const mongoose = require("mongoose");
const Product = require("./../../models/product");
const User = require("./../../models/user");

const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASS
);

mongoose.connect(DB, () => {
  console.log("DB successfully connected ....");
});

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data successfully Deleted...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);
    console.log("Data successfully loaded...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// console.log(process.argv);
