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
import {
  requireAdmin,
  getSystemStats,
  getAllUsers,
  toggleUserStatus,
  updateUserType,
  getSiteSettings,
  updateSiteSettings,
  getPages,
  createPage,
  updatePage,
  deletePage,
  createBackup,
  getActivityLog,
} from "./routes/admin";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Basic API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping pong";
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

  // Admin routes (protected)
  app.use("/api/admin", authenticateToken, requireAdmin);
  
  // System statistics
  app.get("/api/admin/stats", getSystemStats);
  
  // User management
  app.get("/api/admin/users", getAllUsers);
  app.patch("/api/admin/users/:userId/status", toggleUserStatus);
  app.patch("/api/admin/users/:userId/type", updateUserType);
  
  // Site settings
  app.get("/api/admin/settings", getSiteSettings);
  app.put("/api/admin/settings", updateSiteSettings);
  
  // Content management
  app.get("/api/admin/pages", getPages);
  app.post("/api/admin/pages", createPage);
  app.put("/api/admin/pages/:pageId", updatePage);
  app.delete("/api/admin/pages/:pageId", deletePage);
  
  // System management
  app.post("/api/admin/backup", createBackup);
  app.get("/api/admin/activity-log", getActivityLog);

  return app;
}
