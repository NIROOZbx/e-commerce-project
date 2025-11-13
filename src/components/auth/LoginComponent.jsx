import { useContext, useReducer, useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { loginData } from "../../services/authService";
import {Eye,EyeOff,Mail} from 'lucide-react'


//reducer function for getting data from user input
function reducer(state, action) {
   switch(action.type){

    case 'GET_EMAIL':
    return {...state,email:action.payload} //gets the email

    case 'GET_PASSWORD':
    return {...state,password:action.payload} //gets the password

    default:
      return state
   
   }
 
  }

const initialValue = {
  email: "",
  password: "",
};

function LoginComponent(){
      const [value, dispatch] = useReducer(reducer, initialValue)
      const navigate=useNavigate()
      const {handleLogin,setCurrentUserData,currentUserData,setAdminData}=useContext(AuthContext)
      const [showPassword,setShowPassword]=useState(false)
      const [invalidData,setInvalidData]=useState(false)
      const [auth,setAuth]=useState(false)

      
      

        function showPass(){
    setShowPassword(!showPassword)
  }

 async function handleSubmit(e) {
  e.preventDefault();

  if (!value.email.trim()) return;

  const userInDatabase = await loginData(value);

  if (userInDatabase) {
    if (userInDatabase.isAuthenticated === false) {
      setAuth(true); // explicitly blocked
      return;
    }

    setCurrentUserData(userInDatabase);
    localStorage.setItem("userId", JSON.stringify(userInDatabase.id));
    if (userInDatabase.role === "admin") {
      return navigate("/admin", { replace: true });
    }
    return navigate("/", { replace: true });

  } else {
    setInvalidData(true);
  }
}



    return ( 
        <> 
          
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7 w-full h-full"> 
           <p className="text-center px-2 tracking-tighter text-balance font-bold uppercase text-2xl">Welcome back</p>
          
          <p className=" text-center px-2 tracking-tighter text-balance text-xl font-semibold">Login to your account</p>

          <div className="relative">  {/* div to show email field */}
        <input
        style={
            invalidData
              ? { borderColor: "red", outline: "none" }
              : { borderColor: "none" }
          }
        className=" w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
        id="email" placeholder="Enter your email" type="email" onChange={(e)=>dispatch( { type: "GET_EMAIL" , payload:e.target.value } ) } required/>
         <span className=" absolute left-0  top-2.5 ml-1"> <Mail className="ml-2 cursor-pointer" size={20}/></span>
      </div>

          <div className="relative">  {/* div to show password field */}
        <input 
         style={
            invalidData
              ? { borderColor: "red", outline: "none" }
              : { borderColor: "none" }
          }
        className={`w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input ${invalidData&&`animate-horizontal-bounce`}`}
        placeholder="Enter your password" type={showPassword?"text":"password"} onChange={(e)=>dispatch( { type: "GET_PASSWORD" , payload:e.target.value } ) } required/>
        <span className=" absolute left-0  top-2.5 ml-1"> 
       {showPassword ? (<EyeOff className="ml-2 cursor-pointer" onClick={showPass} size={20} />)
        :( <Eye className="ml-2 cursor-pointer" onClick={showPass}  size={20}/> )}</span>
        
        </div>
        <p className="text-center font-semibold text-[#f5190a]" style={invalidData?{display:"block"}:{display:"none"}}>Invalid credentials !</p>

        <p className="text-center font-semibold text-[#f5190a]" style={auth?{display:"block"}:{display:"none"}}>You have been blocked by admin</p>

        <button className="rounded-xl px-2 py-2 cursor-pointer  font-bold bg-black text-[#F9FEFF] btn hover:bg-[#1b1b1c]">LOGIN</button>

        <p  className="text-center font-medium "> Don't have an account? <NavLink to='/register' style={{textDecoration:"underline",color:"green"}}> Register here</NavLink></p>

        </div>
        </form>


        </>
    )

}

export default LoginComponent