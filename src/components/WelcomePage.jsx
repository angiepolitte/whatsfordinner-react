import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function WelcomePage() {
  const { currentUser } = useUser();
  const userId = currentUser?.id;
  const navigate = useNavigate();
  const username = currentUser?.username;
  //   const username = localStorage.getItem("username");
  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);
  return (
    <div>
      <h2>Welcome back, {username}!</h2>
      <button onClick={() => navigate("/restaurant-search")}>
        Go to Restaurant Search
      </button>
    </div>
  );
}

export default WelcomePage;
