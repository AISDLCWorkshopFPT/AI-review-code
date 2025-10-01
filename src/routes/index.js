import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { auth, requireRole } from "../middleware/auth.js";
import { login } from "../controllers/auth.controller.js";
import {
  listUsers,
  getMe,
  createUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  loginSchema,
  createUserSchema,
  listUserQuery,
} from "../schemas/user.schema.js";

const router = Router();

// Auth
router.post("/auth/login", validate(loginSchema), login);

// User
router.get("/users", auth(), validate(listUserQuery, "query"), listUsers);
router.get("/users/me", auth(), getMe);
router.post(
  "/users",
  auth(),
  requireRole("admin"),
  validate(createUserSchema),
  createUser
);
router.delete("/users/:id", auth(), requireRole("admin"), deleteUser);

export default router;
