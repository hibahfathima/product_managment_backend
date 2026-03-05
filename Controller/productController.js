const Categories = require("../Schemas/categorySchema");
const SubCategories = require("../Schemas/subCategorySchema");
const Products = require("../Schemas/productSchema");

// --- Category Controllers ---

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        // Case-insensitive check for existing category FOR THIS USER
        const existingCategory = await Categories.findOne({
            userId,
            name: { $regex: new RegExp(`^${name}$`, "i") }
        });

        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists in your account" });
        }

        const newCategory = new Categories({ name, userId });
        await newCategory.save();

        res.status(201).json({ success: true, message: "Category added successfully", data: newCategory });
    } catch (error) {
        // Catch MongoDB duplicate key error (E11000)
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }
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

        // Case-insensitive check for existing sub-category in this category FOR THIS USER
        const existingSub = await SubCategories.findOne({
            userId,
            categoryId,
            name: { $regex: new RegExp(`^${name}$`, "i") }
        });

        if (existingSub) {
            return res.status(400).json({ success: false, message: "Sub-Category already exists in this category" });
        }

        const newSubCategory = new SubCategories({ name, categoryId, userId });
        await newSubCategory.save();

        res.status(201).json({ success: true, message: "Sub-Category added successfully", data: newSubCategory });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Sub-Category already exists" });
        }
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
        const { name, variants, description, subCategoryId, categoryId } = req.body;
        const userId = req.user.id;

        // Parse variants if they are sent as a string (FormData case)
        const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;

        // Get file paths from multer
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const newProduct = new Products({
            name,
            variants: parsedVariants,
            description,
            subCategoryId,
            categoryId,
            userId,
            images,
        });
        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id)
            .populate("categoryId", "name")
            .populate("subCategoryId", "name");

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const { categoryId, subCategoryId, search, page = 1, limit = 6 } = req.query;
        const userId = req.user.id;

        const query = { userId };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (subCategoryId) {
            query.subCategoryId = subCategoryId;
        } else if (categoryId) {
            query.categoryId = categoryId;
        }

        const skip = (page - 1) * limit;
        const products = await Products.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Products.countDocuments(query);

        res.status(200).json({
            success: true,
            data: products,
            total,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, variants, description, subCategoryId, categoryId, existingImages } = req.body;
        const userId = req.user.id;

        const product = await Products.findOne({ _id: id, userId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found or unauthorized" });
        }

        // Parse variants and existingImages if they are sent as strings
        const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        const parsedExistingImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : (existingImages || []);

        // Get new file paths from multer
        const newImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        // Combine existing (kept) images with new ones
        const images = [...parsedExistingImages, ...newImages];

        product.name = name || product.name;
        product.variants = parsedVariants || product.variants;
        product.description = description || product.description;
        product.subCategoryId = subCategoryId || product.subCategoryId;
        product.categoryId = categoryId || product.categoryId;
        product.images = images;

        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully", data: product });
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
    getProductById,
    updateProduct,
};
