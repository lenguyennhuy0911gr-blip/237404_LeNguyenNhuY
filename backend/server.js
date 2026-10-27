
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const employeeRoutes = require("./routes/employees");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "HR Management API is running" });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        database: mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected"
    });
});

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("Chua cau hinh MONGODB_URI");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "237404_LeNguyenNhuY"
        });

        console.log("Da ket noi MongoDB Atlas");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server dang chay tai cong ${PORT}`);
        });
    } catch (error) {
        console.error("Loi khoi dong:", error.message);
        process.exit(1);
    }
}

startServer();
