import { LayoutDashboard, LogOut, Package, Shirt, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Sidebar({ isExpanded, setIsExpanded }){

    const navigate=useNavigate()
   
return (
   <aside
      className={`h-screen bg-gray-900 text-white flex flex-col fixed shadow-lg transition-all duration-300 ${
        isExpanded ? "w-64" : "w-15"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        {isExpanded ? (
          <h1 className="text-2xl font-bold tracking-wider uppercase">Jersey Hub</h1>
        ) : (
          <h1 className="text-xl font-bold">JH</h1>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex px-2 py-6 flex-col gap-3">
        <div onClick={()=>navigate('/admin')}>
        <li className="hover:cursor-pointer hover:bg-gray-700 rounded-lg py-3 px-2 flex items-center gap-3">
          <LayoutDashboard size={20} />
          {isExpanded && <Link to="/admin">Dashboard</Link>}
        </li>
       </div>

       <div onClick={()=>navigate('ordermanagement')}> 
        <li className="hover:cursor-pointer hover:bg-gray-700 rounded-lg py-3 px-2 flex items-center gap-3">
          <ShoppingCart size={20} />
          {isExpanded && <Link to="ordermanagement">Order Management</Link>}
        </li>
        </div>

        <div onClick={()=>navigate('productmanagement')}> 
        <li className="hover:cursor-pointer hover:bg-gray-700 rounded-lg py-3 px-2 flex items-center gap-3">
          <Package size={20} />
          {isExpanded && <Link to="productmanagement">Products</Link>}
        </li>
        </div>

        <div onClick={()=>navigate('users')} > 
        <li className="hover:cursor-pointer hover:bg-gray-700 rounded-lg py-3 px-2 flex items-center gap-3">
          <Users size={20} />
          {isExpanded && <Link to="users">Users</Link>}
        </li>
      </div>
        <div onClick={()=>navigate('/login')} > 
        <li className="hover:cursor-pointer hover:bg-gray-700 rounded-lg py-3 px-2 flex items-center gap-3">
          <LogOut size={20} />
          {isExpanded && <Link to="/login">Logout</Link>}
        </li>
      </div>
      </nav>

    </aside>
  );


}
export default Sidebar