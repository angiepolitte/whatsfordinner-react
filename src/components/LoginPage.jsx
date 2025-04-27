import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function LoginPage({ onLogin }) {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formBody = new URLSearchParams();
    formBody.append("username", username);
    formBody.append("password", password);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include", // <<< include cookies
        body: formBody.toString(),
      });

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        login(data.user); // lift state
        navigate("/restaurant-search");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error—please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default LoginPage;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           username: username,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         onLogin(); // Call the onLogin function (likely to update local state)
//         // Do NOT navigate here. Let the backend redirect.
//       } else {
//         const errorMessage = await response.text();
//         setError(errorMessage || "Login failed");
//       }
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
