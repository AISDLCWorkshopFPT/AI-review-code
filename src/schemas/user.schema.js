import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).required(),
  role: Joi.string().valid("admin", "user").default("user"),
  password: Joi.string().min(6).required(), // ISSUE: demo dùng plain text
});

export const listUserQuery = Joi.object({
  q: Joi.string().max(50).allow("", null),
  limit: Joi.number().integer().min(1).max(200).default(20), // ISSUE: max 200 có thể bị lạm dụng
  page: Joi.number().integer().min(1).default(1),
  sort: Joi.string().valid("name", "email", "id").default("id"),
  order: Joi.string().valid("asc", "desc").default("asc"),
});
