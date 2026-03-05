const express = require("express");
const {
    addCategory,
    getCategories,
    addSubCategory,
    getSubCategories,
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
} = require("../Controller/productController");
const authMiddleware = require("../Middleware/JWTmiddleware");
const upload = require("../Middleware/multerMiddleware");

const router = express.Router();

// Category Routes
router.post("/category/add", authMiddleware, addCategory);
router.get("/category/all", authMiddleware, getCategories);

// Sub-Category Routes
router.post("/subcategory/add", authMiddleware, addSubCategory);
router.get("/subcategory/:categoryId", authMiddleware, getSubCategories);

// Product Routes
router.post("/add", authMiddleware, upload.array("images", 5), addProduct);
router.get("/details/:id", authMiddleware, getProductById);
router.get("/all", authMiddleware, getProducts);
router.put("/update/:id", authMiddleware, upload.array("images", 5), updateProduct);


module.exports = router;
