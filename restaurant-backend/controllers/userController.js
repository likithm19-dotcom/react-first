const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = (req, res) => {
    const { name, email, password, phone } = req.body;

    // Check if email already exists
    User.findUserByEmail(email, async (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = {
                name,
                email,
                password: hashedPassword,
                phone
            };

            User.registerUser(user, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User Registered Successfully"
                });
            });

        } catch (error) {
            res.status(500).json(error);
        }
    });
};

// Login User
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                phone: user.phone
            },
            "restaurant_secret_key",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    });
};