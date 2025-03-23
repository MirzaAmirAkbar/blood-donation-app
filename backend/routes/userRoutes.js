const express = require("express");

const User = require("../models/User"); // Ensure correct path
const router = express.Router();
const bcrypt = require("bcryptjs"); // For password hashing

// UPDATE AVAILABILITY STATUS
router.put("/availability", async (req, res) => {
    try {
        const { userId, is_available } = req.body;

        // Find user by ID and update availability status
        const user = await User.findByIdAndUpdate(userId, { is_available }, { new: true });

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ msg: "Availability updated successfully", is_available: user.is_available });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// GET USER BY EMAIL
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// UPDATE USER DETAILS
router.put("/:email", async (req, res) => {
    try {
        const { location, contact_info, password, is_available } = req.body;
        const updateData = { location, contact_info, is_available };

        // If the password is being updated, hash it first
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { $set: updateData },
            { new: true }
        );

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ msg: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router; // Export the router
