const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/dashboard", (req, res) => {

    const query = `
        SELECT
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM stores) AS totalStores,
        (SELECT COUNT(*) FROM ratings) AS totalRatings
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: result[0]
        });

    });

});

module.exports = router;