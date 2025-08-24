import { createContext, useEffect, useState } from "react";
import { loginData,registerData } from "../services/authService";
import axios from "axios";

export const AuthContext=createContext(null)

 export function UserAuthentication({children}) {
    
    const [currentUserData,setCurrentUserData]=useState(null)


    const [products,setProducts]=useState([])

    



    useEffect(()=>{
        async function getProducts() {
        try{ 
            let {data:res}=await axios.get("http://localhost:5000/products")
            setProducts(res)
        }catch(e){
            console.log("Error ocuured")
        }
    }
        getProducts()
    },[])

    useEffect(()=>{
        const userIdData=localStorage.getItem('userId')

        if(userIdData){
            async function fetchUserData(){ 
                try{
            const {data:res}= await axios.get(`http://localhost:5000/users/${JSON.parse(userIdData)}`)
            setCurrentUserData(res)
        
         }catch(e){
            console.log("Fetching error")
        }
    }
        fetchUserData()
     }
    },[])
  


    function handleRegister(userRegistrationData){
        return registerData(userRegistrationData)
         
    }

    function handleLogin(userLoginData){
        return loginData(userLoginData)
         
    }

 
return(
    <AuthContext.Provider value={{handleRegister,handleLogin,setCurrentUserData,currentUserData,products}}>
        {children}
    </AuthContext.Provider>

     )
     
}