import { useEffect } from "react";
import { useUser } from "../context/UserContext";

function FetchCurrentUser() {
  const { setCurrentUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/current-user", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
        } else if (response.status === 401) {
          console.log("User not authenticated.");
          setCurrentUser(null); // Handle unauthenticated state
        } else {
          console.log("Failed to fetch current user:", response.statusText);
          setCurrentUser(null); // Handle error state
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null); // Handle fetch error
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return null; // no visible UI, just fetching
}

export default FetchCurrentUser;
