
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import Footer from "../Footer"
import { useState } from "react"
import { api } from "@/api/api"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner"
import { Eye, EyeOff } from "lucide-react"

import { toast } from "sonner"






function ForgotPassword() {

    const [password, setPassword] = useState({
        password: "",
        confirm_password: ""
    })

    const [loading, setLoading] = useState(false)

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)


    const location = useLocation()
    const navigate = useNavigate()

    const accessToken = location?.state?.reset_token;




    function readPass(e) {
        setPassword(prev => ({
            ...prev,
            password: e.target.value
        }));
    }


    function readConfirmPass(e) {
        setPassword(prev => ({ ...prev, confirm_password: e.target.value }))

    }

    async function setForgotPassword(e) {
        e.preventDefault();
        setLoading(true)

        setTimeout(async () => {
            try {
                await api.post("/auth/reset-password", {
                    new_password: password.password,
                    confirm_new_password: password.confirm_password
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setPassword(prev => ({ ...prev, password: "", confirm_password: "" }))
                setTimeout(() => {
                    navigate("/login")

                }, 800);

                setLoading(false)
                toast.success("Password updated successfully")


            } catch (error) {
                toast.error("Something went wrong,Try again ")

              
            } finally {
                setLoading(false)
            }
           
        }, 1500);


    }

   


    return (
        <>

            <div className="h-screen">

                <div className="w-full h-screen flex justify-center items-center">
                    <div className="animated-shadow w-[400px] h-[400px] rounded-xl flex flex-col justify-center items-center gap-7">
                        <h1 className="px-2 text-4xl tracking-tighter text-balance max- lg:font-medium max-sm:px-4 sm:text-4xl lg:text-4xl xl:text-4xl font-bold uppercase">RESET Password </h1>
                        <p className="text-gray-500 text-sm">
                            Please choose a new password to finish signing in.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-7">



                            <form className="flex flex-col items-center justify-center gap-7" onSubmit={setForgotPassword}>

                                <div className="relative w-[300px]">
                                    <Input onChange={readPass} type={showPass ? "text" : "password"} placeholder="Enter your new password" className="w-[300px]" required />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <div className="relative w-[300px]">


                                    <Input onChange={readConfirmPass} type={showConfirmPass ? "text" : "password"} placeholder="Confirm your new password" required />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    >
                                        {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <Button className="bg-black text-white font-bold">{loading ? <span className="flex gap-2 justify-center items-center text-gray-100">Submitting ...
                                    <Spinner className={cn("size-5 animate-spin")} /></span> : "Submit"}</Button>
                            </form>
                        </div>

                    </div>


                </div>
                <Footer />


            </div>
        </>

    )
}

export default ForgotPassword