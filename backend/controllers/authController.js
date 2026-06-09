const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users
            (name, email, password, address, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword, address, "USER"],
            (err, result) => {

                if (err) {

                    console.log("MYSQL ERROR:", err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            success: false,
                            message: "Email already exists"
                        });
                    }

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "User Registered Successfully"
                });
            }
        );

    } catch (error) {

        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.log("MYSQL ERROR:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "mysecretkey",
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            token,
            role: user.role
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};