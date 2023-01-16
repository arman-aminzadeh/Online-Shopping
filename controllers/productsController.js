const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      status: "success",
      result: products.length,
      data: {
        products,
      },
    });
    // res.render("products/index", { products });
  } catch (err) {
    console.error(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    //res.render(`products/${product._id}`, { product });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.error(err.messsage);
  }
  next();
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(404).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      messsage: "Successfully deleted!!",
    });
  } catch (err) {
    console.error(err);
  }
  next();
};
