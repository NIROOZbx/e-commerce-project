import { useContext, useReducer, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { registerData } from "../../services/authService";
import {Eye,EyeOff,User,Mail} from 'lucide-react'

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
  const [error, errorValidation] = useState(false);
  const [pass, passLength] = useState(false);
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setshowConfirmPassword]=useState(false)
  const [duplicateCheck,setDuplicateCheck]=useState(false)


  const { handleRegister } = useContext(AuthContext);



  function showPass(e){
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  function showConfirmPass(e){
    e.preventDefault();
    setshowConfirmPassword(!showConfirmPassword)
  }

  async function handleSubmit(e) {
  e.preventDefault();

  // Reset error states before checking again

  if (!value.name.trim()) {
    alert("Please enter your name");
    return;
  }

  // Check password match
  if (value.password !== value.confirm_password) {
    errorValidation(true);
    return;
  }

  // If we reach here → both checks passed
  if (value.password.length >= 8) {
    const {userExists,emailExists}= await registerData(value)
       if(userExists||emailExists){ 
         
         setDuplicateCheck(true)
       }else{ 
         handleRegister(value);
         navigate("/login");
       }
    
} else {
    passLength(true);
}

}


  return (
    <>
    
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7 w-full h-full"> 

          <span className="text-center px-2 tracking-tighter text-balance font-bold uppercase text-2xl">Register your Account</span>
          <span className=" text-center px-2 tracking-tighter text-balance">'Buying your favourite jersey online made simple'</span>
          
           {/* username input field */}
          <div className="relative"> {/* Div for the first input section */}
        <input
        className="w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
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
        className=" w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
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

      {/* first password input field */}
        
        <div className="relative">  {/* Div for the third input section */}
        <input className=" w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
          style={
            error
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

        
            {/* confirm password input field */}

           <div className="relative">  {/* Div for the fourth input section */}
        <input
        className="w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
          style={
            error
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
        
        
        <p className="text-center font-semibold text-[#f5190a]" style={{ display: error ? "block" : "none" }}> Passwords do not match ! </p>

        <p className="text-center font-semibold text-[#f5190a]" style={{ display: pass ? "block" : "none" }}> Enter a longer password </p>

        <p className="text-center font-semibold text-[#f5190a]" style={{display: duplicateCheck ? "block" : "none" }}>Username or email already exists !</p>

        <button className="rounded-xl px-2 py-2 cursor-pointer  font-bold bg-black text-[#F9FEFF] btn">REGISTER</button>

        <p className="text-center font-medium " style={{fontFamily:"CerebriSans-Bold, -apple-system, system-ui, Roboto, sans-serif"}}> Already Registered ? <NavLink to="/login" style={{textDecoration:"underline",color:"green"}}> Login </NavLink> </p>
        </div>
      </form>
     
    </>
  );
}
export default RegisterComponent;
