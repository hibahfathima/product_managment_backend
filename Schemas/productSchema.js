const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        variants: [
            {
                ram: { type: String, required: true },
                price: { type: Number, required: true },
                qty: { type: Number, required: true },
            }
        ],
        description: {
            type: String,
            trim: true,
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subcategories",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        images: [
            { type: String }
        ],
    },

    {
        timestamps: true,
    }
);

const Products = mongoose.model("products", productSchema);

module.exports = Products;
