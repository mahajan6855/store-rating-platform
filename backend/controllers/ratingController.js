const db = require("../config/db");

// Add or Update Rating
const addRating = (req, res) => {
  const { store_id, rating } = req.body;

  // Temporary user id for testing
  const user_id = 1;

  // Validation
  if (!store_id || !rating) {
    return res.status(400).json({
      success: false,
      message: "Store ID and Rating are required",
    });
  }

  // Check if rating already exists
  const checkSql =
    "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?";

  db.query(
    checkSql,
    [user_id, store_id],
    (err, result) => {

      if (err) {
        console.log("MYSQL ERROR:", err);

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      // Rating already exists → Update
      if (result.length > 0) {

        const updateSql =
          "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?";

        db.query(
          updateSql,
          [rating, user_id, store_id],
          (err) => {

            if (err) {
              console.log("MYSQL ERROR:", err);

              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            return res.status(200).json({
              success: true,
              message: "Rating Updated Successfully",
            });
          }
        );

      } else {

        // First time rating → Insert
        const insertSql =
          "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)";

        db.query(
          insertSql,
          [user_id, store_id, rating],
          (err) => {

            if (err) {
              console.log("MYSQL ERROR:", err);

              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            return res.status(201).json({
              success: true,
              message: "Rating Added Successfully",
            });
          }
        );
      }
    }
  );
};

// Get Ratings
const getRatings = (req, res) => {

  const sql = `
    SELECT
      ratings.id,
      ratings.rating,
      ratings.created_at,
      users.name AS user_name,
      stores.name AS store_name
    FROM ratings
    JOIN users
      ON ratings.user_id = users.id
    JOIN stores
      ON ratings.store_id = stores.id
    ORDER BY ratings.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log("MYSQL ERROR:", err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};

module.exports = {
  addRating,
  getRatings,
};