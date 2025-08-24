import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate, useNavigate } from "react-router-dom";



function ProtectedRoute({children}){
    const{currentUserData}=useContext(AuthContext)  
    

    if(!currentUserData){
       return <Navigate to='/login' replace/>
    }
     return children

}

export default ProtectedRoute