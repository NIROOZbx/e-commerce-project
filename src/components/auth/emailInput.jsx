import { api } from "@/api/api";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailOtpForm() {


    const [email, setEmail] = useState("")
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()

    async function sendOTPEmail(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(async () => {
            try {
                await api.post("/auth/forgot-password", { email: email })
                setLoading(false)
                navigate("/verify-otp", { state: { email: email, value: true } })

            } catch (e) {
                 navigate("/verify-otp", { state: { email: email, value: true } })
              
            }finally{
                setLoading(false)
            }

        }, 1500);


    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="w-[350px] bg-white p-6 rounded-xl shadow-md flex flex-col gap-5">

                <h1 className="text-2xl font-bold text-center tracking-tight">
                    Verify Email
                </h1>

                <p className="text-gray-500 text-sm text-center">
                    Enter your email to receive a verification code.
                </p>

                <form className="flex flex-col gap-4" onSubmit={(e) => sendOTPEmail(e)}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        {loading?<span className="flex gap-2 justify-center items-center text-gray-100">Sending OTP ... <LoaderIcon className={cn("size-5 animate-spin")} /></span>:"Send OTP"}
                    </button>
                </form>

            </div>
        </div>
    );
}
