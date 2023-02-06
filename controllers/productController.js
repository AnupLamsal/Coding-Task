const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { productValidation } = require("../utils/productValidator");

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            product_name: {
              $regex: req.query.keyword,
            },
          },
          {
            category_name: {
              $regex: req.query.keyword,
            },
          },
        ],
      }
    : {};
  const products = await Product.find({ ...keyword });

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { product_name, category_name, description, created_by, status } =
    req.body;

  productValidation(
    { product_name, category_name, description, created_by, status },
    res
  );

  const productItem = {
    product_name,
    category_name,
    description,
    created_by,
    status,
  };

  const product = await Product.create(productItem);

  res.status(201).json({ product, msg: "Product created" });
});

const updateProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found");
  }

  const { product_name, category_name, description, created_by, status } =
    req.body;

  productValidation(
    { product_name, category_name, description, created_by, status },
    res
  );

  product.product_name = product_name;
  product.category_name = category_name;
  product.description = description;
  product.created_by = created_by;
  product.status = status;

  await product.save();

  res.json({ product, msg: "Product updated" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.remove();

  let products = await Product.find({});

  res.json(products);
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
};
