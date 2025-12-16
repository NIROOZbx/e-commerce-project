import {useState } from "react";
import { LoaderIcon, X } from "lucide-react";
import { AuthContext } from "../context/AuthenticationContext";
import { api } from "../api/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


export default function PasswordPopup({setPopup}) {
  const [oldPassword,setOldPassword]=useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false)
   const [errors, setError] = useState({});



  function getPassword(e) {
    setPassword(e.target.value.trim());
  }
  function getOldPass(e) {
    setOldPassword(e.target.value.trim());
  }
  
  function getConfirmPassword(e) {
    setConfirmPassword(e.target.value.trim());
  }
  async function sendToServer(e) {
    e.preventDefault();
    setLoading(true)
   
      setTimeout(async()=>{
        try {
        const {data}=await api.post(`/api/user/change-password`, {
            "old_password":oldPassword,
            "new_password":password,
            "confirm_new_password": confirmPassword
             });
      
        setPopup(false)
         toast.success("Password updated successfully")
         
         setLoading(false)
         
        
      } catch (e) {
        const responseErrors = e.response?.data?.errors;
      const genericError = e.response?.data?.error;
        if (responseErrors) {
        setError(responseErrors);
      } 
      // Handle Single String error (e.g. {"error": "Server failed"})
      else if (genericError) {
        setError({ general: genericError });
      } else {
        setError({ general: "Something went wrong" });
      }
        
    }finally{
        setLoading(false)
    }

      },1000)
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 animate-fadeIn z-50">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"></button>

      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

     <form onSubmit={sendToServer} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Old Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={getOldPass}
          required
        />

        <input
          type="text"
          placeholder="New Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={getPassword}
          required
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={getConfirmPassword}
          required
        />
       {Object.keys(errors).length > 0 && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2 animate-fadeIn">
    
    
    <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
      {Object.values(errors).map((msg, index) => {
        // OPTIONAL: Clean up backend messages that repeat the field name
        // e.g. "OldPassword must be..." -> "Must be..."
        const cleanMsg = msg.replace(/^(OldPassword|NewPassword|ConfirmNewPassword)/, "").trim();
        
        // Capitalize first letter if we stripped the word
        const finalMsg = cleanMsg.charAt(0).toUpperCase() + cleanMsg.slice(1);

        return (
          <li key={index}>
            {finalMsg}
          </li>
        );
      })}
    </ul>
  </div>
)}
        <button
          className="bg-black text-white rounded-lg py-2 mt-2 w-full"
          
        >
         {loading?<span className="flex gap-2 justify-center items-center text-gray-100">Submitting ... <LoaderIcon className={cn("size-5 animate-spin")} /></span>:"Submit"}
        </button>
      </form>
    </div>
  );
}
