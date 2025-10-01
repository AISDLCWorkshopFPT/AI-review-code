import jwt from "jsonwebtoken";
import { db } from "../data.js";
import { config } from "../config.js";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // FIXME: thêm claims audience/issuer, rotation, refresh token...
  const token = jwt.sign(
    { sub: String(user.id), email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: "1h" } // ISSUE: có thể cần ngắn hơn và kèm refresh flow
  );

  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
