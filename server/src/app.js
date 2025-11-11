// server/src/app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

// Book routes
app.use("/api/books", bookRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
