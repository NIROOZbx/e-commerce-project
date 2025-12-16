import { useReducer, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import {Eye,EyeOff,User,Mail, LoaderIcon} from 'lucide-react'

import { api } from "../../api/api";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


//reducer function for getting data from user input
function reducer(state, action) {
  switch (action.type) {
    case "GET_USERNAME":
      return { ...state, name: action.payload.toLowerCase()}; //gets the username

    case "GET_EMAIL":
      return { ...state, email: action.payload.toLowerCase() }; //gets the email

    case "GET_PASSWORD":
      return { ...state, password: action.payload }; //gets the password

    case "CONFRIM_PASSWORD":
      return { ...state, confirm_password: action.payload }; //gets the password again to match the password

    default:
      return state;
  }
}

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function RegisterComponent() {
  const [value, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setshowConfirmPassword]=useState(false)
  const [loading,setLoading]=useState(false)

 const [errors, setError] = useState({});



async function RegisteringUser(e) {
    e.preventDefault()
    setLoading(true)
    setError([])

setTimeout(async() => {
    try{ 
    const {data}=await api.post("/auth/signup",{
        name:value?.name,
        email:value.email,
        password:value.password,
        confirm_password:value.confirm_password
    })
    setLoading(false)
    toast.success("Registered successfully")
    navigate("/verify-otp",{state:{email:data.userEmail}})
    }catch(err){
        setError(err.response?.data?.errors || {});
    }finally{
        setLoading(false)
    }
}, 1500);

    
}


  function showPass(e){
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  function showConfirmPass(e){
    e.preventDefault();
    setshowConfirmPassword(!showConfirmPassword)
  }

  let dupUser=errors?.error?.includes("username or email")


  
  

 


  return (
    <>
    
      <form action="" onSubmit={RegisteringUser}>
        <div className="flex flex-col gap-5 w-full h-full"> 

          <span className="text-center px-2 tracking-tighter text-balance font-bold uppercase text-2xl">Register your Account</span>
          <span className=" text-center px-2 tracking-tighter text-balance">'Buying your favourite jersey online made simple'</span>

          
           {/* username input field */}
          <div className="relative"> {/* Div for the first input section */}
        <input
        className={`w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input `}
          pattern="[a-zA-Z0-9]+"
          required
          id="username"
          placeholder="Enter your username"
          type="text"
          onChange={(e) =>
            dispatch({ type: "GET_USERNAME", payload: e.target.value })
          }
        />
        <span className=" absolute left-0 top-2.5 ml-1"> <User className="ml-2 cursor-pointer" size={20} /></span>
        
        </div> {/* username input field end*/}
        


            {/* email input field */}
          <div className="relative">  {/* Div for the second input section */}
        <input 
        className={`w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input ${errors.Email ? "border-red-500" : ""}`}
          required
          id="email"
          placeholder="Enter your email"
          type="email"
          onChange={(e) =>
            dispatch({ type: "GET_EMAIL", payload: e.target.value })
          }
        />
        <span className=" absolute left-0  top-2.5 ml-1"> <Mail className="ml-2 cursor-pointer" size={20}/></span>
         
        </div> {/* email input field end */}
         
         {errors.Email && <p className="text-center text-red-500 text-sm">{errors.Email}</p>}

      {/* first password input field */}
        
        <div className="relative">  {/* Div for the third input section */}
        <input className={`w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input  ${errors&&`animate-horizontal-bounce`}`}
          style={
            errors.Password
              ? { borderColor: "red", outline: "none" }
              : { borderColor: "none" }
          }
          required
          placeholder="Enter your password"
          type={showPassword?"text":"password"}
          onChange={(e) =>
            dispatch({ type: "GET_PASSWORD", payload: e.target.value })
          }
        />
        {/* button to show and hide password */}
        <span className=" absolute left-0  top-2.5 ml-1"> 
       {showPassword ? (<Eye className="ml-2 cursor-pointer" onClick={showPass} size={20} />)
        :( <EyeOff className="ml-2 cursor-pointer" onClick={showPass}  size={20}/> )}</span>

         

        </div> {/* first password end field */}
         {errors.Password && <p className="text-center text-red-500 text-sm">{errors.Password}</p>}

        
            {/* confirm password input field */}

           <div className="relative">  {/* Div for the fourth input section */}
        <input
        className="w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
          style={
             errors.ConfirmPassword
              ? { borderColor: "red", outline: "none" }
              : { borderColor: "none" }
          }
          required
          placeholder="Confirm your password"
          type={showConfirmPassword?"text":"password"}
          onChange={(e) =>
            dispatch({ type: "CONFRIM_PASSWORD", payload: e.target.value })
          }
        />

        {/* image to show and hide confirm password */}
       <span className=" absolute left-0  top-2.5 ml-1">{showConfirmPassword ? (<Eye className="ml-2 cursor-pointer" onClick={showConfirmPass} size={20} />)
        :( <EyeOff className="ml-2 cursor-pointer" onClick={showConfirmPass}  size={20}/> )}</span>

      

        </div> {/* confirm password input field end*/}
         
        {errors.ConfirmPassword && <p className="text-center text-red-500 text-sm">{errors.ConfirmPassword}</p>}


        {dupUser &&  <p className="text-center text-red-500 text-sm">{errors.error}</p>}


        <button disabled={loading} className="rounded-xl px-2 py-2 cursor-pointer  font-bold bg-black text-[#F9FEFF] btn hover:bg-[#1b1b1c]">{loading?<span className="flex gap-2 justify-center items-center text-gray-100">Registering ... <LoaderIcon className={cn("size-5 animate-spin")} /></span>:"Register"}</button>


        <p className="text-center font-medium " style={{fontFamily:"CerebriSans-Bold, -apple-system, system-ui, Roboto, sans-serif"}}> Already Registered ? <NavLink to="/login" style={{textDecoration:"underline",color:"green"}}> Login </NavLink> </p>
        </div>
      </form>
     
    </>
  );
}
export default RegisterComponent;
