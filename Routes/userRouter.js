const { signupController, loginController, verifyUserController, logoutController } = require("../Controller/userController.js");
const express = require("express");
const authMiddleware = require("../Middleware/JWTmiddleware");
const { signupValidator, loginValidator } = require("../Validator/authValidator");
const validateRequest = require("../Middleware/validateRequest");

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signupController)
router.post("/login", loginValidator, validateRequest, loginController)
router.post("/logout", logoutController)
router.get("/verify", authMiddleware, verifyUserController)

module.exports = router;