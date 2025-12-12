import { useContext, useReducer, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";



import { Eye, EyeOff, LoaderIcon, Mail } from 'lucide-react'
import { cn } from "@/lib/utils";
import { toast } from "sonner"

//reducer function for getting data from user input
function reducer(state, action) {
    switch (action.type) {

        case 'GET_EMAIL':
            return { ...state, email: action.payload } //gets the email

        case 'GET_PASSWORD':
            return { ...state, password: action.payload } //gets the password

        default:
            return state

    }

}

const initialValue = {
    email: "",
    password: "",
};

function LoginComponent() {
    const [value, dispatch] = useReducer(reducer, initialValue)
    const navigate = useNavigate()
    const { handleLogin} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState({})




    function showPass() {
        setShowPassword(!showPassword)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setErrors("")
        setLoading(true)
        setTimeout(async () => {
            try {
                const user = await handleLogin(value.email, value.password)
                 toast.success("Login successful")
                console.log("Inside try block");
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                   
                    setTimeout(()=>navigate("/"),1000)
                }


            } catch (err) {
                console.log(err);

                if (err?.response?.data?.errors) {
                    setErrors(err?.response?.data?.errors || {});
                    return;
                }

                if (err?.response?.data?.error ) {
                  setErrors({ error: err.response.data.error });
                    return;
                }

                setErrors({ error: "Something went wrong" });
            }
            finally {
                setLoading(false)
            }
        }, 1500)



    }


    return (
        <>

            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 w-full h-full">
                    <p className="text-center px-2 tracking-tighter text-balance font-bold uppercase text-2xl">Welcome back</p>

                    <p className=" text-center px-2 tracking-tighter text-balance text-xl font-semibold">Login to your account</p>

                    <div className="relative"> {/* div to show email field */}
                        <input
                            style={
                                error.Email
                                    ? { borderColor: "red", outline: "none" }
                                    : { borderColor: "none" }
                            }
                            className=" w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input"
                            id="email" placeholder="Enter your email" type="email" onChange={(e) => dispatch({ type: "GET_EMAIL", payload: e.target.value })} required />
                        <span className=" absolute left-0  top-2.5 ml-1"> <Mail className="ml-2 cursor-pointer" size={20} /></span>
                    </div>

                    {error.Email && <p className="text-center font-bold text-red-600">{error.Email}</p>}

                    <div className="relative">  {/* div to show password field */}
                        <input
                            style={
                                error.Password
                                    ? { borderColor: "red", outline: "none" }
                                    : { borderColor: "none" }
                            }
                            className={`w-full px-8 py-2 pl-10 rounded-3xl border-2 border-[#5f6060] first-input`}
                            placeholder="Enter your password" type={showPassword ? "text" : "password"} onChange={(e) => dispatch({ type: "GET_PASSWORD", payload: e.target.value })} required />
                        <span className=" absolute left-0  top-2.5 ml-1">
                            {showPassword ? (<EyeOff className="ml-2 cursor-pointer" onClick={showPass} size={20} />)
                                : (<Eye className="ml-2 cursor-pointer" onClick={showPass} size={20} />)}</span>

                    </div>
                    {error.Password && <p className="text-center font-semibold text-red-600">{error.Password}</p>}

                 {error.error&& <p className="text-center text-sm font-semibold text-red-600">{error.error}</p>}

                    
                    

                    <button disabled={loading} className={`rounded-xl px-2 py-2 cursor-pointer  font-bold bg-black text-[#F9FEFF] btn hover:bg-[#1b1b1c] ${loading ? "bg-gray-800" : "bg-[#21201e]"}`}>{loading?<span className="flex gap-2 justify-center items-center text-gray-100">Logging in ... <LoaderIcon className={cn("size-5 animate-spin")} /></span>:"Login"}</button>

                    <p className="text-center font-medium "> Don't have an account? <NavLink to='/register' style={{ textDecoration: "underline", color: "green" }}> Register here</NavLink></p>
                    <p className="text-center font-medium "> <NavLink to='/email-input' style={{ textDecoration: "underline", color: "green" }}>Forgot Password</NavLink></p>

                </div>
            </form>


        </>
    )

}

export default LoginComponent