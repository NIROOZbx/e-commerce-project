import { createContext, useEffect, useState } from "react";
import { loginData,registerData } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext=createContext(null)



 export function UserAuthentication({children}) {
    
    const [currentUserData,setCurrentUserData]=useState(null)

  const navigate=useNavigate()
    const [products,setProducts]=useState([])

    
    console.log(currentUserData?.isAuthenticated);
    
    
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
            handleForceLogout()
        }
    }
        fetchUserData()
     }
    },[])
  
    function handleForceLogout(){ 
            localStorage.removeItem("userId")
            setCurrentUserData(null)
            navigate('/');
       
    }

    function handleRegister(userRegistrationData){
        return registerData(userRegistrationData)
         
    }

    function handleLogin(userLoginData){
        return loginData(userLoginData)
         
    }


 
return(
    <AuthContext.Provider value={{handleRegister,handleLogin,setCurrentUserData,currentUserData,products,setProducts,handleForceLogout}}>
        {children}
    </AuthContext.Provider>

     )
     
}