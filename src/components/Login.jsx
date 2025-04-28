import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.status === "ok") {
        // Set the current user in the context, assuming response.data contains userId
        login({ id: response.data.userId, username: username });
        onLogin(); // Lift state
        navigate("/restaurant-search"); // Navigate to next page
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Network error—please try again");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Username
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
