const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../Schemas/userSchema");
const signupController = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        else {
            const newUser = new Users({ name, email, password })
            await newUser.save();

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: newUser
            });
        }



    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Users.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found please signup"
            })
        }
        else {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordValid) {
                return res.status(409).json({
                    success: false,
                    message: "Invalid password"
                })
            }
            else {
                const token = jwt.sign(
                    { id: existingUser._id, email: existingUser.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000
                });



                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    data: {
                        id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email
                    }
                })
            }
        }



    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyUserController = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { signupController, loginController, verifyUserController, logoutController };
