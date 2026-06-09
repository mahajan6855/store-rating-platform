import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stores");
      setStores(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (storeId, value) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  const submitRating = async (storeId) => {
    try {
      const token = localStorage.getItem("token");

      if (!ratings[storeId]) {
        alert("Please select rating first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/ratings",
        {
          store_id: storeId,
          rating: Number(ratings[storeId]),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rating submitted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to submit rating");
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          background: "#2575fc",
          color: "white",
        }}
      >
        <h2>⭐ Rating Platform</h2>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            👤
          </button>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50px",
                background: "white",
                color: "black",
                borderRadius: "8px",
                padding: "10px",
                minWidth: "120px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              <button
                onClick={logout}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search Store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Stores Table */}
      <table
        style={{
          width: "90%",
          margin: "auto",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#2575fc", color: "white" }}>
            <th style={{ padding: "12px" }}>Store Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Address</th>
            <th style={{ padding: "12px" }}>Rating</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {store.name}
              </td>

              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {store.email}
              </td>

              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {store.address}
              </td>

              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                <select
                  value={ratings[store.id] || ""}
                  onChange={(e) =>
                    handleRatingChange(store.id, e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="1">1 </option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                  <option value="5">5 </option>
                </select>
              </td>

              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => submitRating(store.id)}
                  style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;