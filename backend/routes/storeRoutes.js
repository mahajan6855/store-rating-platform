const express = require("express");
const router = express.Router();

const {
    addStore,
    getStores
} = require("../controllers/storeController");

router.post("/", addStore);
router.get("/", getStores);

module.exports = router;