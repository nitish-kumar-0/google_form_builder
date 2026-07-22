const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        // Step 1: Check required fields
        if (!fullName || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // Step 2: Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }

        // Step 3: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 4: Create user
        const user = await User.create({

            fullName,
            email,
            password: hashedPassword

        });

        // Step 5: Generate JWT
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        // Step 6: Response
        res.status(201).json({

            success: true,
            message: "User Registered Successfully",

            token,

            user: {

                id: user._id,
                fullName: user.fullName,
                email: user.email

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Step 1: Validate Input
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });

        }

        // Step 2: Find User
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Step 3: Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        // Step 4: Generate Token
        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        // Step 5: Success Response
        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    register , login
};