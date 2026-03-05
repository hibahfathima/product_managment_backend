const Users = require("../Schemas/userSchema");

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Account verified successfully",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { verifyOTP };