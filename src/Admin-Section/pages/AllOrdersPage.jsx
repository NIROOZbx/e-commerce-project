import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import axios from "axios";
import { OrderContext } from "../../context/OrderContext";
import { CheckCircle, Clock, Search, ShoppingCart, Truck, XCircle } from "lucide-react";
import '/src/styles/allorder.css'
import api from "../../api/api";

function AllOrdersPage() {
  const [allUser, setAllUser] = useState([]);
  const {orderDetails,setOrderDetails}=useContext(OrderContext)
  const [deliveryStatus,setDeliverStatus]=useState('')

  useEffect(() => {
    async function getAllUsers() {
      let { data: res } = await api.get("/users");
      setAllUser(res);
      console.log("getting all users");
    }

    getAllUsers();
  }, []);

const orders = allUser?.flatMap(user => {
  return (user.order)?.flatMap(order => {
    return (order.products).map(product => ({
      ...product,
      username: user.name,
      userid: user.id,
      status: order.status,
      delivery: order.delivery,
      payment: order.payment,
      orderid:order.id,
      date:order.date
    }));
  });
});

const totalOrders=orders.length
const processing=orders.filter((item)=>item?.delivery==="Processing").length
const shipped=orders.filter((item)=>item?.delivery==="Shipped").length
const cancelled=orders.filter((item)=>item?.delivery==="Cancelled").length
const delivered=orders.filter((item)=>item?.delivery==="Delivered").length

async function handleStatusChange(userId,orderId,value) {
  

 const userToUpdate=allUser.find(user=>user.id===userId)
 
 const updatedOrders=userToUpdate.order.map(item=>orderId===item.id?{...item,delivery:value}:item)

 try{ 
  console.log('running');
  

  let {data:res}=await api.patch(`/users/${userId}`,{order:updatedOrders})
  console.log(res)

  setOrderDetails(prevOrder=>prevOrder.map(order=>order.id===orderId?{...order,delivery:value}:order))

  setAllUser(prevUser=>prevUser.map(user=>user.id===userId?{...user,order:updatedOrders}:user))
  }catch(e){
    console.log("An error occured in updating the orders in the admin orders")
  }

}

console.log(orders);

  return( 
   <>
 <div className="px-15 bg-gray-50 min-h-screen font-sans">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
            </div>

            {/* Dashboard Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

                {/* Card 1: Total Orders */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{totalOrders}</p>
                    </div>
                    <div className="p-4 rounded-full text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                        <ShoppingCart />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Processing</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{processing}</p>
                    </div>
                    <div className="p-4 rounded-full text-white bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                        <Clock />
                    </div>
                </div>

                {/* Card 2: Shipped */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Shipped</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{shipped}</p>
                    </div>
                    <div className="p-4 rounded-full text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                        <Truck />
                    </div>
                </div>

                {/* Card 3: Delivered */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Delivered</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{delivered}</p>
                    </div>
                    <div className="p-4 rounded-full text-white bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                        <CheckCircle />
                    </div>
                </div>

                {/* Card 4: Cancelled */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Cancelled</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{cancelled}</p>
                    </div>
                    <div className="p-4 rounded-full text-white bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                        <XCircle />
                    </div>
                </div>

            </div>
            
            {/* Your orders table would go here... */}

            <div className="bg-white rounded-xl cont-shadow overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                            <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                            <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Total Price</th>
                            <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((orderItem, index) => (
                            <tr key={`${orderItem?.orderId}-${orderItem?.id}-${index}`} className="hover:bg-gray-50">
                                <td className="p-5 flex items-center">
                                    <img src={`https://ecommerce-api-3bc3.onrender.com${orderItem?.image}`} alt={orderItem?.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{orderItem?.name}</p>
                                        <p className="text-xs text-gray-500">Product ID: {orderItem?.id}</p>
                                    </div>
                                </td>
                                <td className="p-5 text-sm text-gray-700 capitalize" >{orderItem?.username}</td>
                                <td className="p-5 text-sm text-gray-700 capitalize" >{orderItem?.date}</td>
                                <td className="p-5 text-sm font-semibold text-gray-800">${orderItem?.price.toFixed(2)}</td>
                                <td className="p-5">
                                    <select
                                        value={orderItem?.delivery}
                                        onChange={(e) => handleStatusChange(orderItem?.userid, orderItem?.orderid, e.target.value)}
                                        className={`p-2 rounded-lg text-xs font-semibold shadow-lg cursor-pointer`}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     </>
     )
}
export default AllOrdersPage;
