const Wishlists = require("../Schemas/wishlistSchema");
const Products = require("../Schemas/productSchema");

const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const existingWishlist = await Wishlists.findOne({ userId, productId });

        if (existingWishlist) {
            await Wishlists.findByIdAndDelete(existingWishlist._id);
            return res.status(200).json({ success: true, message: "Removed from wishlist" });
        } else {
            const newWishlist = new Wishlists({ userId, productId });
            await newWishlist.save();
            return res.status(201).json({ success: true, message: "Added to wishlist", data: newWishlist });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlistItems = await Wishlists.find({ userId }).populate({
            path: "productId",
            populate: [
                { path: "categoryId", select: "name" },
                { path: "subCategoryId", select: "name" }
            ]
        });

        // Filter out items where the product might have been deleted
        const products = wishlistItems
            .filter(item => item.productId)
            .map(item => item.productId);

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    toggleWishlist,
    getWishlist,
};
