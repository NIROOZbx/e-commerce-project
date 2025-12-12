import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { AuthContext } from "./AuthenticationContext";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotifications] = useState([]);
  const { role } = useContext(AuthContext)
  

  const getNotifications = async () => {
    try {
      const { data } = await api.get(`/api/notifications/`);
      setNotifications(data.notifications);
    } catch (e) {
      console.error("Error fetching notifications");
    }
  };

   useEffect(() => {
        if (role == "user") {
            getNotifications()
        }
    }, []);


  return (
    <NotificationContext.Provider value={{ notification, getNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
