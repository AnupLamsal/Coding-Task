const { check, validationResult } = require("express-validator");

exports.productValidation = [
  check("product_name", "Please enter product name").not().isEmpty(),
  check("category_name", "Please enter category name").not().isEmpty(),
  check("description", "Please enter description").not().isEmpty(),
  check("created_by", "Created By should be included").not().isEmpty(),
  check("status", "Please enter status").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

// exports.productValidate = req => {};
