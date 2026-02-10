import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import { logger } from "./utils/logger.js";

// ====== LOAD ENVIRONMENT VARIABLES ======
dotenv.config();

// Debug: Show what's loaded
console.log("\n Environment loaded:");
console.log(
  "MANTAHQ_SDK_KEY:",
  process.env.MANTAHQ_SDK_KEY ? "Loaded" : "Missing"
);
console.log("PORT:", process.env.PORT || "3002 (default)");
console.log("APP_NAME:", process.env.APP_NAME || "Not set");
console.log("NODE_ENV:", process.env.NODE_ENV || "development\n");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "User Management API",
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/users", userRoutes);

// API documentation
app.get("/", (req, res) => {
  res.json({
    name: process.env.APP_NAME || "User Management API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    description:
      "A starter template for building a User Management API using Express.js and Postgres with the MantaHQ JS SDK.",
    endpoints: {
      users: {
        create: {
          method: "POST",
          path: "/api/users",
          description: "Create a new user",
          body: {
            name: "string (required)",
            email: "string (required)",
          },
        },
        getAll: {
          method: "GET",
          path: "/api/users",
          description: "Get all users",
        },
      },
      health: {
        method: "GET",
        path: "/health",
        description: "Check API health status",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled error", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  console.log(`
╔════════════════════════════════════════════╗
║    🚀 ${process.env.APP_NAME || "User Management API"}     ║
║    Port: ${PORT}                           ║
║    Environment: ${process.env.NODE_ENV || "development"}     ║
╚════════════════════════════════════════════╝

Available Endpoints:
   GET    /                 - API Documentation
   GET    /health          - Health Check
   POST   /api/users       - Create user
   GET    /api/users       - Get all users

Example Usage:
   curl -X POST http://localhost:${PORT}/api/users \\
        -H "Content-Type: application/json" \\
        -d '{"name":"John Doe","email":"john@example.com"}'

   curl "http://localhost:${PORT}/api/users?minAge=20&maxAge=30"
    `);
});
