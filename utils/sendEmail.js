const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;