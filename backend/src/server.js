const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const usersRoutes = require("./routes/users-routes.js");
const tasksRoutes = require("./routes/tasks-routes.js");
const authRoutes = require("./routes/auth-routes.js");
const categoryRoutes = require("./routes/category-routes.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow necessary methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
    ], // Allow headers for file uploads, etc.
    credentials: true, // If you're sending cookies or other credentials
  })
);

app.use((req, res, next) => {
  console.log("CORS applied to:", req.method, req.url);
  next();
});
app.use(morgan("dev"));
app.use(cookieParser());

// Using built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files (like images) from the 'public/uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

PORT = 8000;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
