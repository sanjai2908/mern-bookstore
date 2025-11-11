import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Use Render's port if available
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
await connectDB(process.env.MONGODB_URI);

// ✅ Create server
const server = http.createServer(app);

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
