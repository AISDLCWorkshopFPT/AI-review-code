import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "changeme", // ISSUE: fallback secret yếu
  nodeEnv: process.env.NODE_ENV || "development",
};
