import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantSearch from "./components/RestaurantSearch";
import RestaurantResults from "./components/RestaurantResults";
import RandomRestaurant from "./components/RandomRestaurant";
import SuccessPage from "./components/SuccessPage";
import StarterPage from "./components/StarterPage";
import NavBar from "./components/NavBar";
import Favorites from "./components/Favorites";
import CreateFavoriteList from "./components/CreateFavoritesList";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./context/UserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUsername = localStorage.getItem("username");

    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername(localStorage.getItem("username"));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <UserProvider>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div style={{ paddingTop: "64px" }}>
          {" "}
          {/* Adjust padding to avoid overlap */}
          <Routes>
            <Route path="/" element={<StarterPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/registration"
              element={<Register onLogin={handleLogin} />}
            />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/restaurant-search" element={<RestaurantSearch />} />
            <Route path="/restaurant-results" element={<RestaurantResults />} />
            <Route path="/random-restaurant" element={<RandomRestaurant />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

// https://chatgpt.com/share/680ea817-0fc8-800f-9258-7f9eb8ec8cad
