const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
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

categorySchema.index({ name: 1, userId: 1 }, { unique: true });


const Categories = mongoose.model("categories", categorySchema);

module.exports = Categories;
