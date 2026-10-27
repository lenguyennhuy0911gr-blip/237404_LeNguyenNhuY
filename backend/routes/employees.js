
const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET: Danh sach va tim kiem nhan vien
router.get("/", async (req, res) => {
    try {
        const search = (req.query.search || "").trim();

        const filter = search
            ? {
                $or: [
                    { employeeId: { $regex: search, $options: "i" } },
                    { fullName: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        const employees = await Employee.find(filter).sort({ employeeId: 1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Chi tiet nhan vien
router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Khong tim thay nhan vien"
            });
        }

        res.json(employee);
    } catch (error) {
        res.status(400).json({
            message: "ID nhan vien khong hop le"
        });
    }
});

// POST: Them nhan vien
router.post("/", async (req, res) => {
    try {
        const { employeeId, fullName, email } = req.body;

        if (!employeeId || !fullName || !email) {
            return res.status(400).json({
                message: "Ma nhan vien, ho ten va email la bat buoc"
            });
        }

        const existed = await Employee.findOne({
            employeeId: employeeId.trim()
        });

        if (existed) {
            return res.status(409).json({
                message: "Ma nhan vien da ton tai"
            });
        }

        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: "Them nhan vien thanh cong",
            employee
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Cap nhat nhan vien theo MongoDB ID
router.put("/:id", async (req, res) => {
    try {
        const { employeeId, fullName, email } = req.body;

        if (!employeeId || !fullName || !email) {
            return res.status(400).json({
                message: "Ma nhan vien, ho ten va email la bat buoc"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Khong tim thay nhan vien"
            });
        }

        res.json({
            message: "Cap nhat nhan vien thanh cong",
            employee
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Xoa nhan vien
router.delete("/:id", async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Khong tim thay nhan vien"
            });
        }

        res.json({ message: "Xoa nhan vien thanh cong" });
    } catch (error) {
        res.status(400).json({
            message: "ID nhan vien khong hop le"
        });
    }
});

module.exports = router;
