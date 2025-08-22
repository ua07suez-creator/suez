import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  loginHandler,
  registerHandler,
  authenticateToken,
  getCurrentUserHandler,
} from "./routes/auth";
import { testConnection, testUsers, simpleLogin } from "./routes/test-auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/login", loginHandler);
  app.post("/api/auth/register", registerHandler);
  app.get("/api/auth/me", authenticateToken, getCurrentUserHandler);

  // Test routes
  app.get("/api/test/connection", testConnection);
  app.get("/api/test/users", testUsers);
  app.post("/api/test/login", simpleLogin);

  return app;
}
