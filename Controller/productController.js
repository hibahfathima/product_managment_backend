const Categories = require("../Schemas/categorySchema");
const SubCategories = require("../Schemas/subCategorySchema");
const Products = require("../Schemas/productSchema");

// --- Category Controllers ---

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        // Check for existing category FOR THIS USER
        const existingCategory = await Categories.findOne({ name, userId });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists in your account" });
        }

        const newCategory = new Categories({ name, userId });
        await newCategory.save();

        res.status(201).json({ success: true, message: "Category added successfully", data: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const categories = await Categories.find({ userId });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- Sub-Category Controllers ---

const addSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const userId = req.user.id;

        const newSubCategory = new SubCategories({ name, categoryId, userId });
        await newSubCategory.save();

        res.status(201).json({ success: true, message: "Sub-Category added successfully", data: newSubCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSubCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user.id;
        const subCategories = await SubCategories.find({ categoryId, userId });
        res.status(200).json({ success: true, data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- Product Controllers ---

const addProduct = async (req, res) => {
    try {
        const { name, variants, description, subCategoryId, images } = req.body;
        const userId = req.user.id;

        const newProduct = new Products({
            name,
            variants,
            description,
            subCategoryId,
            userId,
            images,
        });
        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const userId = req.user.id;
        const products = await Products.find({ subCategoryId, userId });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    addCategory,
    getCategories,
    addSubCategory,
    getSubCategories,
    addProduct,
    getProducts,
};
