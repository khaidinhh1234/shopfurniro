import Joi from "joi";
export const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải từ 6 ký tự trở lên",
    "string.empty": "Mật khẩu không được để trống",
  }),
});

export const RegisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải từ 6 ký tự trở lên",
    "string.empty": "Mật khẩu không được để trống",
  }),
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Tên không được để trống",
    "string.min": "Tên phải từ 3 ký tự trở lên",
    "string.max": "Tên không được quá 30 ký tự",
  }),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "any.required": "Mật khẩu không được để trống",
  }),

  avatar: Joi.string().default("../upload/avata.jpg"),
});
export const UserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải từ 6 ký tự trở lên",
    "string.empty": "Mật khẩu không được để trống",
  }),
  name: Joi.string().min(3).max(30).messages({
    "string.empty": "Tên không được để trống",
    "string.min": "Tên phải từ 3 ký tự trở lên",
    "string.max": "Tên không được quá 30 ký tự",
  }),
  avatar: Joi.string(),
});
