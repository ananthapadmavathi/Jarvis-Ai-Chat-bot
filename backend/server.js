require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Routes
const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const app = express();

// ===============================
// Connect Database
// ===============================
connectDB();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Serve Frontend Files
// ===============================
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// API Routes
// ===============================
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 Jarvis Backend Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log("=================================");
});