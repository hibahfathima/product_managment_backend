const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a user can't wishlist the same product twice
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Wishlists = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlists;
