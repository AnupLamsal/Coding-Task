import axios from "axios";

const API_URL = "/api/products/";

// Create new product
const createProduct = async productData => {
  const response = await axios.post(API_URL, productData);

  return response.data;
};

// Get Product By Id
const getProductById = async productId => {
  const response = await axios.get(API_URL + productId);

  return response.data;
};

// Get products
const getProducts = async (keyword = "") => {
  const response = await axios.get(`/api/products?keyword=${keyword}`);

  return response.data;
};

// Update products
const updateProduct = async (productId, productData) => {
  const response = await axios.patch(API_URL + productId, productData);

  return response.data;
};

// Delete product
const deleteProduct = async productId => {
  const response = await axios.delete(API_URL + productId);

  return response.data;
};

const productService = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};

export default productService;
