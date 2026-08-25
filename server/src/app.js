import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import rateLimit from "express-rate-limit";
import pg from "pg";
import authRouter from "./routes/auth.js";
import moodEntriesRouter from "./routes/moodEntries.js";
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

  const isTestEnv = process.env.NODE_ENV === "test";
  const sessionStore = isTestEnv
    ? undefined // default in-memory store is fine for tests
    : new (connectPgSimple(session))({
        pool: new pg.Pool({ connectionString: process.env.DATABASE_URL }),
        createTableIfMissing: true
      });

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "test-secret-not-for-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use("/api/auth", authRateLimit, authRouter);
  app.use("/api/mood-entries", moodEntriesRouter);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  app.use(errorHandler);

  return app;
}
