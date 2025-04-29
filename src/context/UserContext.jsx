// import React, { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null); //not logged
//   const login = (user) => setCurrentUser(user);
//   const logout = () => setCurrentUser(null);

//   useEffect(() => {
//     const savedUsername = localStorage.getItem("username");
//     const savedUserId = localStorage.getItem("userId");
//     if (savedUsername && savedUserId) {
//       setCurrentUser({ username: savedUsername, id: parseInt(savedUserId) });
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // export const useUser = () => useContext(UserContext);
// export function useUser() {
//   return useContext(UserContext);
// }

// const { currentUser } = useUser();

// if (currentUser) {
//   console.log("User is logged in:", currentUser.username);
// }
