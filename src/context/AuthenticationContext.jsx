import { createContext, useEffect, useState } from "react";
import { loginData, registerData } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export const AuthContext = createContext(null);

export function UserAuthentication({ children }) {
  const [currentUserData, setCurrentUserData] = useState(null);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("idle");

  useEffect(() => {
    async function getProducts() {
        setLoading('loading')
      try {
        let { data: res } = await api.get("/products");
        setProducts(res);
        setLoading('success')
      } catch (e) {
        setLoading('error')
        console.log("Error ocuured");
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    const userIdData = localStorage.getItem("userId");

    if (userIdData) {
      async function fetchUserData() {
        try {
          const { data: res } = await api.get(
            `/users/${JSON.parse(userIdData)}`
          );
          setCurrentUserData(res);
        } catch (e) {
          console.log("Fetching error");
          handleForceLogout();
        }
      }
      fetchUserData();
    }
  }, []);

  useEffect(()=>{
    const adminData = localStorage.getItem("adminId");
       if (adminData) {
      async function fetchAdmin() {
        try {
          const { data: res } = await api.get(
            `/admin/${JSON.parse(adminData)}`
          );
          setCurrentUserData(res);
        } catch (e) {
          console.log("Fetching error");
          
        }
      }
      fetchAdmin();
    }

  },[])

  function handleForceLogout() {
    localStorage.removeItem("userId");
    setCurrentUserData(null);
    setCart([]);
    setWishListed([]);
    navigate("/login");
  }

  function handleRegister(userRegistrationData) {
    return registerData(userRegistrationData);
  }

  function handleLogin(userLoginData) {
    return loginData(userLoginData);
  }

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleLogin,
        setCurrentUserData,
        currentUserData,
        products,
        setProducts,
        handleForceLogout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
