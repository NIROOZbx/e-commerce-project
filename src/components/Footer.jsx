import { NavLink, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"; // social icons

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-gray-300 mt-12">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h2 
            className="text-white text-2xl font-bold cursor-pointer uppercase"
            onClick={() => navigate("/")}
          >
            Jersey Hub
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your one-stop hub for premium football jerseys. Authentic, stylish, 
            and delivered right to your doorstep.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer hover:text-white">Home</li>
            <li onClick={() => navigate("/products")} className="cursor-pointer hover:text-white">Products</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-white">Contact</li>
            <li onClick={() => navigate("/support")} className="cursor-pointer hover:text-white">Support</li>
            <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-white">About</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Shipping Policy</li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
            <li className="hover:text-white cursor-pointer"><NavLink to='/order'>Track Your Order</NavLink></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
            <a href="mailto:support@jerseyhub.com" className="hover:text-white"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <p>© 2025 Jersey Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
