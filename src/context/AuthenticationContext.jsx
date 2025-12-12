import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api, jsonApi } from "../api/api";


export const AuthContext = createContext(null);

export function UserAuthentication({ children }) {


    const navigate = useNavigate();


    const [token, setToken] = useState(sessionStorage.getItem("accessToken") || "");
    const [role, setRole] = useState(sessionStorage.getItem("role") || "");
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user") || "null"));


    async function handleLogin(userEmail, userPassword) {

        try {
            const { data } = await api.post("/auth/login", { email: userEmail, password: userPassword });



            const { accessToken, role, email, name } = data;

            setToken(accessToken);
            setRole(role);
            setUser({ name, email })

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("user", JSON.stringify({ name, email }));

            return { role, name, email };
        } catch (err) {
            throw err;
        }


    }

    async function handleLogout() {

        try{

        await api.post("/auth/logout")
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("user");
        setToken("");
        setRole("");
        setUser(null);


        navigate("/login");

        }catch(err){ 

        }
        
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                user,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
