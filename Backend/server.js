const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");

const responseRoutes = require("./routes/responseRoutes");



const connectDB = require("./config/db");

dotenv.config();

const app = express();


connectDB();  

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);

app.use("/api", responseRoutes);

app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("GOOGLE FORM BACKEND");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});