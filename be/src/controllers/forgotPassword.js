import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";
import { hashPassword } from "../utils/password.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "USER NOT FOUND",
      });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const hashPass = hashPassword(newPassword);
    if (!hashPass) {
      return res.status(500).json({
        message: "HASH PASSWORD ERROR",
      });
    }

    user.password = hashPass;
    await user.save();

    const emailSubject = "Password Reset in Node.js App";
    const emailText = `Your new password is: ${newPassword}`;
    await sendEmail(email, emailSubject, emailText);

    return res.status(200).json({
      message: "RESET PASSWORD SUCCESS",
    });
  } catch (error) {
    next(error);
  }
};
