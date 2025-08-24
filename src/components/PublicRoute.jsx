import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";


function PublicRoute({children}){

   const{currentUserData}=useContext(AuthContext) 

   if(currentUserData){
    return <Navigate to='/'/>
   }

  return children

}

export default PublicRoute