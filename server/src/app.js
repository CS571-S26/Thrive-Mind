import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

// Built once per process, not per-request, so it works both for the real
// server (index.js) and for tests that import this file directly.
export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : false,
      credentials: true
    })
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  app.use(errorHandler);

  return app;
}
