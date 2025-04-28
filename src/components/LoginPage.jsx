// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const formBody = new URLSearchParams();
//     formBody.append("username", username);
//     formBody.append("password", password);

//     try {
//       const response = await fetch("http://localhost:8080/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         credentials: "include", // <<< include cookies
//         body: formBody.toString(),
//       });

//       const data = await response.json();

//       if (response.ok && data.status === "ok") {
//         onLogin(); // lift state
//         navigate("/restaurant-search");
//       } else {
//         setError(data.error || "Login failed");
//       }
//     } catch (err) {
//       setError("Network error—please try again");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Log In</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <label>
//         Username
//         <input
//           name="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           name="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginPage;
