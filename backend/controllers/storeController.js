const db = require("../config/db");

const addStore = (req, res) => {
    const { name, email, address, owner_id } = req.body;

    const sql =
        "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

    db.query(
        sql,
        [name, email, address, owner_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Store Added Successfully"
            });
        }
    );
};

const getStores = (req, res) => {

    db.query(
        "SELECT * FROM stores",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: result
            });
        }
    );
};

module.exports = {
    addStore,
    getStores
};