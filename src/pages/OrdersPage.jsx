import { useContext } from "react"
import { OrderContext } from "../context/OrderContext"
import Navbar from "../components/Navbar"
import '/src/styles/orderspage.css'
import { History, Package, PackageCheck, PackageX, Trash2 } from "lucide-react"
import { AuthContext } from "../context/AuthenticationContext"
import Footer from "../components/Footer"


const getStatusDetails = (status) => {
    switch (status) {
        case "Processing":
            return { icon: <History size={20} />, color: "text-yellow-500" };
        case "Shipped":
            return { icon: <Package size={20} />, color: "text-blue-500" };
        case "Delivered":
            return { icon: <PackageCheck size={20} />, color: "text-green-500" };
        case "Cancelled":
            return { icon: <PackageX size={20} />, color: "text-red-500" };
        default:
            return { icon: <History size={20} />, color: "text-gray-500" };
    }
};

function OrdersPage(){ 
    const {orderDetails,cancelOrder}=useContext(OrderContext)
     const{currentUserData}=useContext(AuthContext)
     

    

    return (
        <>
        <Navbar />
            <div className="bg-gray-50 min-h-screen mt-16">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Your Order History</h1>
                        <p className="mt-2 text-lg text-gray-500">Track your past and current orders.</p>
                    </div>

                    {/* Orders List or Empty State */}
                    {orderDetails && orderDetails.length > 0 ? (
                        <div className="space-y-8">
                            {orderDetails.map((order) => (
                                <div  data-aos="fade-up" key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden main-cont">
                                    {/* Order Header */}
                                    <div className="bg-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b ">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">ORDER ID</p>
                                            <p className="font-mono text-gray-800">#{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">DATE PLACED</p>
                                            <p className="text-gray-800">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">TOTAL AMOUNT</p>
                                            <p className="text-xl font-bold text-gray-900">{order.products[0]?.currency}{order.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Products in the Order */}
                                    <div className="p-4 sm:p-6 space-y-6">
                                        {order.products.map((product) => {
                                            const statusInfo = getStatusDetails(order.delivery);
                                            return (
                                                <div key={product.id} className="grid grid-cols-1 md:grid-cols-[100px,1fr,auto] gap-6 items-start">
                                                    {/* Product Image */}
                                                    <img
                                                        className="w-24 h-24 object-cover rounded-lg cursor-pointer cont"
                                                        src={`https://ecommerce-api-3bc3.onrender.com${product.image}`}
                                                        alt={product.name}
                                                        onClick={() => navigate(`/products/${product.id}`)}
                                                    />
                                                    
                                                    {/* Product Details */}
                                                    <div>
                                                        <p className="font-bold text-lg text-gray-800">{product.name}</p>
                                                        <p className="text-sm text-gray-500">Qty: {product.quantity || 1}</p>
                                                        <div className="mt-4">
                                                          <p className="font-semibold text-sm">DELIVER TO:</p>
                                                          <p className="text-gray-600 text-sm capitalize">{order.address.name}, {order.address.address}, {order.address.city}, {order.address.State}</p>
                                                        </div>
                                                    </div>

                                                    {/* Status and Cancel Button */}
                                                    <div className="flex flex-col items-start md:items-end gap-4">
                                                        <div className={`flex items-center gap-2 font-bold text-lg ${statusInfo.color}`}>
                                                            {statusInfo.icon}
                                                            <span>{order.delivery}</span>
                                                        </div>
                                                        {order.delivery !== "Cancelled" && (
                                                            <button
                                                                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold text-sm transition-colors"
                                                                onClick={() => {
                                                                    if (window.confirm("Are you sure you want to cancel this order?")) {
                                                                        cancelOrder(order.id);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 size={16} />
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Empty State for No Orders
                        <div className="text-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800">No Orders Yet</h3>
                            <p className="mt-2 text-gray-500">You haven't placed any orders. Start shopping to see your order history here!</p>
                            <button
                                onClick={() => navigate('/products')}
                                className="mt-6 bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
        ) 


}

export default OrdersPage