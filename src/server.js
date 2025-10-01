import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { config } from "./config.js";
import router from "./routes/index.js";

const app = express();

// ISSUE: CORS mở toàn bộ nguồn gốc
app.use(cors()); // FIXME: cấu hình origin, methods, credentials
app.use(express.json({ limit: "1mb" })); // ISSUE: có thể cần nhỏ hơn tùy risk
app.use(morgan("dev"));

// Swagger UI
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api", router);

app.get("/health", (_req, res) =>
  res.json({ status: "ok", env: config.nodeEnv })
);

// ISSUE: thiếu helmet, rate-limit, request id
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
