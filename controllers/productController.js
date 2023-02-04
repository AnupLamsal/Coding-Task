const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json({ product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_name, category_name, description, created_by, status } =
      req.body;

    const productItem = {
      product_name,
      category_name,
      description,
      created_by,
      status,
    };

    const product = await Product.create(productItem);

    res.status(201).json({ product, msg: "Product created" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "No product found" });
    }

    const { product_name, category_name, description, created_by, status } =
      req.body;

    product.product_name = product_name;
    product.category_name = category_name;
    product.description = description;
    product.created_by = created_by;
    product.status = status;

    await product.save();

    res.json({ product, msg: "Product updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "No product found" });
    }

    await product.remove();

    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
};
