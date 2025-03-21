import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantSearch from './components/RestaurantSearch';
import RestaurantResults from './components/RestaurantResults';
import RandomRestaurant from './components/RandomRestaurant';
import RegistrationPage from './components/RegistrationPage';
import SuccessPage from './components/SuccessPage';
import LoginPage from './components/LoginPage';
import StarterPage from './components/StarterPage';
import NavBar from './components/NavBar';
import WelcomePage from './components/WelcomePage';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedUsername = localStorage.getItem('username');
        
        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUsername(localStorage.getItem('username'));
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <NavBar  isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div style={{ paddingTop: '64px' }}> {/* Adjust padding to avoid overlap */}
            <Routes>
                <Route path="/" element={<StarterPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/registration" element={<RegistrationPage onLogin={handleLogin}/>} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/restaurant-search" element={<RestaurantSearch />} />
                <Route path="/restaurant-results" element={<RestaurantResults />} />
                <Route path="/random-restaurant" element={<RandomRestaurant />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
