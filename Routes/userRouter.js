const { signupController, loginController, verifyUserController, logoutController } = require("../Controller/userController.js");
const express = require("express");
const authMiddleware = require("../Middleware/JWTmiddleware");
const router = express.Router();

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/verify", authMiddleware, verifyUserController)

module.exports = router;