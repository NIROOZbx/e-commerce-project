import { Navigate, useLocation, useNavigate } from "react-router-dom";
import otpImg from "../../assets/otp.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";




function VerifyOTPPage() {

    const location = useLocation()
    const navigate = useNavigate()

    const inputs = useRef([]);


    const [otp, setOTP] = useState(["", "", "", "", "", ""])

    const [timer, setTimer] = useState(60);
    const [startTimer, setStartTimer] = useState(false);
    const [loading, setLoading] = useState(false)
    const [response, SetResponse] = useState(null)
    const [error, SetError] = useState("")

    const emailFromRouter = location.state?.email || "";
    const val = location.state?.value || false



    useEffect(() => {
        if (!startTimer) return;          // only run if user clicked the button

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    setStartTimer(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [startTimer]);



    function handleOTP(value, index) {
        let newOtp = [...otp]

        newOtp[index] = value

        setOTP(newOtp)

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }

        if (value === "" && index > 0) {
            inputs.current[index - 1].focus();
        }
    }

    async function VerifyOTPOnServer() {

    


        const finalOTP = otp.join("");

        SetError("")
        SetResponse(null)

        setLoading(true)

        setTimeout(async () => {
            try {

                const resp = await api.post(val ? "/auth/verify-reset-otp" : "/auth/verify-otp", {
                    email: emailFromRouter,
                    otp: finalOTP
                })

                if (resp.status === 202) {
                    SetResponse(true);
                    setLoading(false);
                    navigate("/login");
                    return;
                };

                if (resp.status === 200) {

                  
                    
                    SetResponse(true);
                    setLoading(false);
                    navigate("/forgot-password", {
                        state: { reset_token: resp.data['reset-token'] }
                    }); return
                }




            } catch (err) {
                SetResponse(false)
                SetError(err?.response?.data?.error || "Invalid OTP");

            } finally {
                setLoading(false);
            }

        }, 2000);


    }

    async function handleResendOtp() {
        try {
            await api.post(val?"auth/forgot-password":"/auth/resend-otp" , {
                email: emailFromRouter,
            });

            setTimer(60);
            setStartTimer(true);
        } catch (err) {
            SetError(err?.response?.data?.error || "Something went wrong")

        }
    }



    return (

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md flex flex-col items-center gap-5">

                <p className="text-xl font-bold">OTP Verification</p>
                <img src={otpImg} className="h-18 w-18" alt="" />
                <p className="text-center text-gray-700 leading-tight break-words">One Time Password (OTP) has been sent via email to <span className="font-bold">{emailFromRouter} </span></p>
                <p className="text-gray-600">Enter the 6-digit code below</p>
                <div className="flex gap-4">
                    {otp.map((value, index) => (

                        <input type="text"
                            value={value}
                            ref={(el) => (inputs.current[index] = el)}
                            key={index}
                            maxLength={1}
                            onChange={(e) => handleOTP(e.target.value, index)}
                            className={`w-10 h-10 text-center text-xl border-2 rounded-md focus:border-black
                                 outline-none ${response === true
                                    ? "border-green-500"
                                    : response === false
                                        ? "border-red-500 animate-shake"
                                        : "border-black"
                                }`} />

                    ))


                    }

                </div>
                {error && <p className="font-bold text-red-500">{error}</p>}

                <button className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-900 transition"
                    onClick={VerifyOTPOnServer}>
                        {loading?<span className="flex gap-2 justify-center items-center text-gray-100">Verifying ... 
                            <Spinner className={cn("size-5 animate-spin")} /></span>:"Verify OTP"}</button>


                {startTimer ? (
                    <p className="text-gray-600 text-sm">
                        Resend OTP in <span className="font-bold">{timer}s</span>
                    </p>
                ) : (
                    <button
                        className="text-gray-700 text-sm font-semibold "
                        onClick={() => {
                            setTimer(60);
                            setStartTimer(true)
                            handleResendOtp()

                        }}
                    >
                        Resend OTP
                    </button>
                )}

            </div>



        </div>
    )


}


export default VerifyOTPPage