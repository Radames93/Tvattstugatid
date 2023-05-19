import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const CalendarBooking = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are log out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CalendarBooking;
