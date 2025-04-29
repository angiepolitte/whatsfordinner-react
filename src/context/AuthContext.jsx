import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/me", { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        onabort;
        if (err.response?.status === 401) {
          // Expected when not logged in
          setCurrentUser(null);
        } else {
          console.error("Unexpected error checking auth:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add login function
  const login = (user) => {
    setCurrentUser(user); // Update the context state with the logged-in user
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
