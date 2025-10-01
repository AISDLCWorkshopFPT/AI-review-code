import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function auth(required = true) {
  return (req, res, next) => {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;

    if (!token) {
      if (!required) return next();
      return res.status(401).json({ message: "Missing token" });
    }
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      req.user = payload;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
