import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <> 
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <p className="text-gray-600 mb-6 text-center">
          Have questions about your order or our products? We’d love to hear from you!
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-pink-600" />
            <span className="text-gray-700">support@jerseyhub.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-green-600" />
            <span className="text-gray-700">+91 12345 67890</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Bengaluru, India</span>
          </div>
        </div>

        <form className="mt-8 space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />
          <textarea 
            placeholder="Your Message" 
            rows="4" 
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
          />
          <button className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow">
            Send Message
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ContactPage;
