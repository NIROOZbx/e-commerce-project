
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Shield, ShieldOff, Trash2, UserCircle, Users } from 'lucide-react';
import { AuthContext } from "../../context/AuthenticationContext";
import { api } from "../../api/api";
import { toast } from "sonner";

function UserManagementPage(){ 
    
        const[allUser,setAllUser]=useState([])
        const{user}=useContext(AuthContext)
       

    useEffect(()=>{

        async function getAllUsers() {
            let {data}=await api.get("/admin/users")
            
            setAllUser(data.data)

        }

        getAllUsers()

    },[])

    async function handleToggleBlock(userID,userAuth) {

       const confirmation = window.confirm(
        userAuth
            ? "Do you want to unblock this user?"
            : "Do you want to block this user?"
    );

    if (!confirmation) return; // stop if user clicked cancel
        const updatedAuth=!userAuth
         console.log(updatedAuth);
        await api.patch(`/admin/users/${userID}`,{"is_blocked":updatedAuth})
        setAllUser(prevUser=>prevUser.map(user=>user.id===userID?{...user,is_blocked:updatedAuth}:user))
        toast.success(userAuth?"Unblocked user successfully":"Blocked user successfully")
     
        if (user?.id === userID) {
            setAllUser(prevData => ({
                ...prevData,
                isAuthenticated: updatedAuth
            }));
        }
        
    }



     // counts
    const totalUsers = allUser.length
    const blockedUsers = allUser.filter(user => user.is_blocked).length

    return (
        <div className="px-10 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-500 mt-1">Manage user access and details.</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
                    <Users className="text-blue-500 w-10 h-10 mr-4" />
                    <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
                    <ShieldOff className="text-red-500 w-10 h-10 mr-4" />
                    <div>
                        <p className="text-sm text-gray-500">Blocked Users</p>
                        <p className="text-2xl font-bold text-gray-800">{blockedUsers}</p>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Verified</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allUser.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center">
                                    <img
                                    src={user.profile_image || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                    <div className="px-2">
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.is_blocked ?'bg-red-100 text-red-800':'bg-green-100 text-green-800' }`}>
                                        {user.is_blocked ?"Blocked":"Active"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleToggleBlock(user.id,user.is_blocked)}
                                            className={`p-2 rounded-full transition-colors ${user.is_blocked ? 'text-red-600 hover:bg-red-100' : 'text-green-600 hover:bg-green-100'}`}
                                            title={user.is_blocked ?"Unblock User": "Block User" }
                                        >
                                            {user.is_blocked ? <ShieldOff size={20} /> : <Shield size={20} />}
                                        </button>
                                        
                                        
                                    </div>
                                    
                                </td>
                                 <td className="p-4">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        user.is_verified
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                                    {user.is_verified ? "Verified" : "Not Verified"}
                                </span>
                            </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UserManagementPage