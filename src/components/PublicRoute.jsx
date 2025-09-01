import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";


function PublicRoute({children}){

   const{currentUserData}=useContext(AuthContext) 
   
  
   if(currentUserData){
    if(currentUserData.email==="admin@gmail.com" && currentUserData.password==="admin@123"){ 
       return <Navigate to='/admin'/>
    }else{ 
    return <Navigate to='/'/>
   }
   }

  return children

}

export default PublicRoute