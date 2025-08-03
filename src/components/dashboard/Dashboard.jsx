// src/components/dashboard/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/myitems", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        setItems(res.data);
      } catch (err) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    };
    fetchItems();
  }, [state.token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {state.user?.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Your Lost Item Submissions:</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.item_description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
