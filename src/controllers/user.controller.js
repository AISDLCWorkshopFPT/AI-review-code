import { db, nextUserId } from "../data.js";

export async function listUsers(req, res) {
  const { q, page, limit, sort, order } = req.query;

  // Filter rất đơn giản (demo)
  let data = db.users;
  if (q) {
    const s = String(q).toLowerCase();
    data = data.filter(
      (u) =>
        u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    );
  }

  // Sort
  data = data.sort((a, b) => {
    const x = a[sort];
    const y = b[sort];
    if (x < y) return order === "asc" ? -1 : 1;
    if (x > y) return order === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination (offset-based)
  const total = data.length;
  const start = (page - 1) * limit;
  const items = data.slice(start, start + limit);

  // ISSUE: không có cursor-based pagination, không trả ETag/Cache
  res.json({ page, limit, total, items });
}

export async function getMe(req, res) {
  const id = Number(req.user?.sub);
  const me = db.users.find((u) => u.id === id);
  if (!me) return res.status(404).json({ message: "Not found" });
  res.json({ id: me.id, email: me.email, name: me.name, role: me.role });
}

export async function createUser(req, res) {
  const { email, name, role, password } = req.body;

  // ISSUE: không check duplicate email chuẩn tắc (race condition nếu đa tiến trình)
  if (db.users.some((u) => u.email === email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = { id: nextUserId(), email, name, role, password }; // ISSUE: lưu plain password
  db.users.push(user);
  res.status(201).json({ id: user.id, email, name, role });
}

export async function deleteUser(req, res) {
  const id = Number(req.params.id);
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  // ISSUE: không có soft-delete/audit log
  db.users.splice(idx, 1);
  res.status(204).send();
}
