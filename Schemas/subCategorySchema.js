const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Sub-Category name is required"],
            trim: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

subCategorySchema.index({ name: 1, userId: 1, categoryId: 1 }, { unique: true });

const SubCategories = mongoose.model("subcategories", subCategorySchema);

module.exports = SubCategories;
