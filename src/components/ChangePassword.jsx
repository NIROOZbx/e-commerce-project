import { useContext, useState } from "react";
import { X } from "lucide-react";
import api from "../api/api";
import { AuthContext } from "../context/AuthenticationContext";

export default function PasswordPopup({setPopup}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pass, passLength] = useState(false);
  const { currentUserData } = useContext(AuthContext);

  console.log(password.length, confirmPassword.length);

  function getPassword(e) {
    setPassword(e.target.value.trim());
  }

  function getConfirmPassword(e) {
    setConfirmPassword(e.target.value.trim());
  }
  async function sendToServer() {
    if (
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      password === confirmPassword
    ) {
      try {
        await api.patch(`/users/${currentUserData.id}`, { password: password });
        console.log("send response to server");
        setPopup(false)
        
      } catch (e) {
        console.log("An error in updating the password");
      }
    } else {
      passLength(true);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 animate-fadeIn z-50">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"></button>

      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <div className="flex flex-col gap-7">
        <input
          type="text"
          placeholder="New Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={getPassword}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={getConfirmPassword}
        />
        {pass && (
          <p className="text-red-500">
            "Password must have 8 characters or above"
          </p>
        )}
        <button
          className="bg-black text-white rounded-lg py-2 mt-2 w-full"
          onClick={sendToServer}
        >
          Save Password
        </button>
      </div>
    </div>
  );
}
