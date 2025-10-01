// In-memory "DB" cho demo
export const db = {
  users: [
    {
      id: 1,
      email: "admin@example.com",
      name: "Admin",
      role: "admin",
      password: "admin123",
    }, // ISSUE: plain password
    {
      id: 2,
      email: "user@example.com",
      name: "User",
      role: "user",
      password: "user123",
    },
  ],
};

// Helper lấy user next id
export function nextUserId() {
  return Math.max(...db.users.map((u) => u.id)) + 1;
}
