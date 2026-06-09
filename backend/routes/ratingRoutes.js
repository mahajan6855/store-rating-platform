const express = require("express");
const router = express.Router();

const {
  addRating,
  getRatings,
} = require("../controllers/ratingController");

// Add Rating
router.post("/", addRating);

// Get All Ratings
router.get("/", getRatings);

module.exports = router;