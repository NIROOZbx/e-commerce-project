import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import lonely404 from "../Lonely 404.json"; // ✅ import JSON file

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      
      <Lottie animationData={lonely404} loop={true} className="w-96 h-96" />

      <h1 className="text-4xl font-bold text-red-500 mt-6">404 - Page Not Found</h1>
      <p className="mt-3 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
