const express = require("express");
const { toggleWishlist, getWishlist } = require("../Controller/wishlistController");
const authMiddleware = require("../Middleware/JWTmiddleware");

const router = express.Router();

router.post("/toggle", authMiddleware, toggleWishlist);
router.get("/all", authMiddleware, getWishlist);

module.exports = router;
