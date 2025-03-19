import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    if (!username) {
        navigate('/login'); // Redirect to login if no username is found in localStorage
    }

    return (
        <div>
            <h2>Welcome back, {username}!</h2>
            <button onClick={() => navigate('/restaurant-search')}>
                Go to Restaurant Search
            </button>
        </div>
    );
}

export default WelcomePage;
