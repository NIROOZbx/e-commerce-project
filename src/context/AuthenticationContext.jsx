import { createContext, useEffect, useState } from "react";
import { loginData,registerData } from "../services/authService";

export const AuthContext=createContext(null)

 export function UserAuthentication({children}) {
    
    const [userID,setUserID]=useState(null)
    useEffect(()=>{
        const userIdData=localStorage.getItem('userId')
        if(userIdData){
            setUserID(JSON.parse(userIdData))
        }
    })
    console.log(userID)
    function handleRegister(userRegistrationData){
        return registerData(userRegistrationData)
         
    }

    function handleLogin(userLoginData){
        return loginData(userLoginData)
         
    }
return(
    <AuthContext.Provider value={{handleRegister,handleLogin,setUserID,userID}}>
        {children}
    </AuthContext.Provider>

     )
     
}