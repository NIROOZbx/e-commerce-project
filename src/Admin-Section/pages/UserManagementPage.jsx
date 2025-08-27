import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Shield, ShieldOff, Trash2, UserCircle, Users } from 'lucide-react';
import { AuthContext } from "../../context/AuthenticationContext";

function UserManagementPage(){ 
    
        const[allUser,setAllUser]=useState([])
        const{setCurrentUserData,currentUserData,handleForceLogout}=useContext(AuthContext)
       

    useEffect(()=>{

        async function getAllUsers() {
            let {data:res}=await axios.get("http://localhost:5000/users")
            setAllUser(res)
            console.log( "getting all users",)

        }

        getAllUsers()

    },[])

    async function handleToggleBlock(userID,userAuth) {
        const updatedAuth=!userAuth
        await axios.patch(`http://localhost:5000/users/${userID}`,{isAuthenticated:updatedAuth})
        setAllUser(prevUser=>prevUser.map(user=>user.id===userID?{...user,isAuthenticated:updatedAuth}:user))
      // Check if the updated user is the currently logged-in user
        if (currentUserData?.id === userID) {
            // If so, update the currentUserData state as well
            setCurrentUserData(prevData => ({
                ...prevData,
                isAuthenticated: updatedAuth
            }));
        }
        
    }

    async function handleDeleteUser(userID,name) {
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
        
        if(window.confirm(`Are you sure you want to delete the user ${capitalizedName}`)){ 
        await axios.delete(`http://localhost:5000/users/${userID}`)
        setAllUser(prevUser=>prevUser.filter(user=>user.id!==userID))
        if (currentUserData?.id === userID){ 
            handleForceLogout()
        }
        }
        
    }

     // counts
    const totalUsers = allUser.length
    const blockedUsers = allUser.filter(user => !user.isAuthenticated).length

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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allUser.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center">
                                    <UserCircle size={35} className="text-gray-400 mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.isAuthenticated ? "Active" : "Blocked"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleToggleBlock(user.id,user.isAuthenticated)}
                                            className={`p-2 rounded-full transition-colors ${user.isAuthenticated ? 'text-yellow-600 hover:bg-yellow-100' : 'text-green-600 hover:bg-green-100'}`}
                                            title={user.isAuthenticated ? "Block User" : "Unblock User"}
                                        >
                                            {user.isAuthenticated ? <ShieldOff size={20} /> : <Shield size={20} />}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id,user.name)}
                                            className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        
                                    </div>
                                    
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