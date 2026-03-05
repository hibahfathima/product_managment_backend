const express = require("express");
const {
    addCategory,
    getCategories,
    addSubCategory,
    getSubCategories,
    addProduct,
    getProducts,
} = require("../Controller/productController");
const authMiddleware = require("../Middleware/JWTmiddleware");

const router = express.Router();

// Category Routes
router.post("/category/add", authMiddleware, addCategory);
router.get("/category/all", authMiddleware, getCategories);

// Sub-Category Routes
router.post("/subcategory/add", authMiddleware, addSubCategory);
router.get("/subcategory/:categoryId", authMiddleware, getSubCategories);

// Product Routes
router.post("/add", authMiddleware, addProduct);
router.get("/:subCategoryId", authMiddleware, getProducts);


module.exports = router;
