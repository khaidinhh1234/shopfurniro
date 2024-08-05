import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { LoginSchema, RegisterSchema, UserSchema } from "../schema/auth.js";
import BlackListToken from "../models/Black-list-token.js";

export const Signup = async (req, res) => {
  console.log("ahihi");
  try {
    const { email, password } = req.body;
    const { error } = RegisterSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((i) => i.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ messages });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Tài khoản đã tồn tại" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    const newuser = await User.create({
      ...req.body,
      email,
      password: hashPassword,
      role,
    });
    return res.status(StatusCodes.CREATED).json(newuser);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
const GenerateaccessToken = async (UserID) => {
  return jwt.sign({ UserID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const GenerateRefreshToken = async (UserID) => {
  return jwt.sign({ UserID }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
export const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = LoginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((i) => i.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ messages });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Tài khoản không tồn tại" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Mật khẩu không chính xác" });
    }
    const accessToken = await GenerateaccessToken(user._id);

    const refreshToken = await GenerateRefreshToken(user._id);

    return res.status(StatusCodes.OK).json({
      accessToken,
      refreshToken,
      user,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Vui lòng nhập  đầy đủ", error });
  }
};
export const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Không có token" });
    }
    const blacklistedtoken = new BlackListToken({ token });
    await blacklistedtoken.save();

    return res
      .status(StatusCodes.OK)
      .json({ token, message: "Đăng xuất thành công" });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const oldtoken = req.headers.authorization;

    const blacklisttokenId = await BlackListToken.findOne({ token });
    if (blacklisttokenId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token đã hết hạn" });
    }
    const userId = "userId từ oldToken"; // Giả sử bạn đã lấy được userId từ oldToken
    const newToken = generateRefreshToken(userId); // Sử dụng hàm generateRefreshToken đã có

    // Trả về refreshToken mới cho client
    res.status(StatusCodes.OK).json({ newToken });
  } catch (error) {
    console.error(`Error during token refresh:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const isTokenBlacklisted = async (token) => {
  const tokenInBlacklist = await BlackListToken.findOne({ token });
  return !!tokenInBlacklist;
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { error } = UserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((i) => i.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ messages });
    } else {
      const { name, email, password, avatar } = req.body;

      const hashPassword = bcrypt.hashSync(password, 10);
      req.body.password = hashPassword;
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    if (user.length === 0) {
      return res.status(404).json({ message: "không có user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
