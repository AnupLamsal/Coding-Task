exports.productValidation = (product, response) => {
  if (!product.product_name) {
    response.status(400);
    throw new Error("Product name is required");
  }

  if (!product.category_name) {
    response.status(400);
    throw new Error("Category name is required");
  }

  if (!product.description) {
    response.status(400);
    throw new Error("Description is required");
  }

  if (!product.created_by) {
    response.status(400);
    throw new Error("Created by is required");
  }

  if (!product.status) {
    response.status(400);
    throw new Error("Product status is required");
  }
};
