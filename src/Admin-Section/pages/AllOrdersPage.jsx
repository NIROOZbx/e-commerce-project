import { useContext, useEffect, useRef, useState } from "react";

import { OrderContext } from "../../context/OrderContext";
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Search, ShoppingCart, Truck, XCircle } from "lucide-react";
import '/src/styles/allorder.css'
import { api } from "../../api/api";
import { toast } from "sonner";

function AllOrdersPage() {

    const [allOrders, setAllOrders] = useState([])

    const [highlightOrder, setHighlightOrder] = useState(null);
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
    });

    const ref = useRef(0)


    useEffect(() => {
        async function getAllOrders() {
            let { data } = await api.get(`/admin/orders?page=${page}&limit=${limit}`);
            setAllOrders(data.data);
            ref.current = data.totalCount


            setTotalPages(data.totalPages || 1);
            console.log("getting all users");
        }

        getAllOrders();
    }, [page]);
    useEffect(() => {
        async function fetchStats() {
            try {
                const { data } = await api.get("/admin/dashboard-stats");
                // Backend returns: { stats: { TotalItems: 100, Active: 50... } }
                // Map it to your state keys
                setStats({
                    total: data.stats.TotalItems,
                    active: data.stats.Active,
                    shipped: data.stats.Shipped,
                    delivered: data.stats.Delivered,
                    cancelled: data.stats.Cancelled,
                });
            } catch (err) {
                console.error("Stats error", err);
            }
        }
        fetchStats();
    }, []);

    const handlePrev = () => {
        if (page > 1) setPage(curr => curr - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(curr => curr + 1);
    };





    async function handleStatusChange(itemId, value) {

        try {
            console.log('running');


            let { data: res } = await api.patch(`/admin/orders/${itemId}`, { "status": value })
            console.log(res)

            setAllOrders(prevOrder => prevOrder.map(order => order.item_id === itemId ? { ...order, item_status: value } : order))
        
            toast.success("Updated order status successfully")

        } catch (e) {
           const resData = e.response?.data;
            if (resData?.error) {
                toast.warning(resData.error);
                return;
            }

        }

    }

    console.log(allOrders);

    return (
        <>
            <div className="px-15 bg-gray-50 min-h-screen font-sans">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
                </div>

                {/* Dashboard Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

                    {/* Card 1: Total allOrders */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                        </div>
                        <div className="p-4 rounded-full text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                            <ShoppingCart />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Processing</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1 ">{stats.active}</p>
                        </div>
                        <div className="p-4 rounded-full text-white bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                            <Clock />
                        </div>
                    </div>

                    {/* Card 2: Shipped */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Shipped</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.shipped}</p>
                        </div>
                        <div className="p-4 rounded-full text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                            <Truck />
                        </div>
                    </div>

                    {/* Card 3: Delivered */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Delivered</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.delivered}</p>
                        </div>
                        <div className="p-4 rounded-full text-white bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                            <CheckCircle />
                        </div>
                    </div>

                    {/* Card 4: Cancelled */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Cancelled</p>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{stats.cancelled}</p>
                        </div>
                        <div className="p-4 rounded-full text-white bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                            <XCircle />
                        </div>
                    </div>

                </div>

                {/* Your allOrders table would go here... */}

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Total Price</th>
                                <th className="p-5 text-left text-xs font-semibold text-gray-500 uppercase">Delivery Status</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {allOrders.map((orderItem, index) => (


                                <tr key={`${orderItem?.orderId}-${orderItem?.id}-${index}`}
                                    className={`cursor-pointer  ${highlightOrder === orderItem.order_id ? "bg-blue-50" : "hover:bg-gray-50 "
                                        }`}
                                    onMouseOver={() => setHighlightOrder(orderItem.order_id)}>
                                    <td className="p-5 font-semibold text-gray-800">#{orderItem.order_id}</td>
                                    <td className="p-5 flex items-center">
                                        <img
                                            src={orderItem.product_image}
                                            alt={orderItem.product_name}
                                            className="w-12 h-12 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">{orderItem.product_name}</p>
                                            <p className="text-xs text-gray-500">Product ID: {orderItem.product_id}</p>
                                        </div>
                                    </td>

                                    <td className="p-5 text-sm text-gray-700 capitalize">
                                        {orderItem.customer_name} <br />
                                        <span className="text-xs lowercase text-gray-500">{orderItem.customer_email}</span>
                                    </td>
                                    <td className="p-5 text-sm text-gray-700 capitalize" >{new Date(orderItem.order_date).toLocaleString()}</td>
                                    <td className="p-5 text-sm font-semibold text-gray-800"> ${orderItem.item_status == "cancelled" ? 0 : orderItem.total_price.toFixed(2)}</td>
                                    <td className="p-5 ">
                                        <select
                                            value={orderItem?.item_status}
                                            onChange={(e) => handleStatusChange(orderItem?.item_id, e.target.value)}
                                            className={`p-2 rounded-lg text-xs font-semibold shadow-lg cursor-pointer `}
                                        >
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    {allOrders.length > 0 && (
                        <div className="flex justify-center items-center gap-6 py-8 border-t border-gray-100">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 transition-all ${page === 1
                                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                                    : "hover:bg-black hover:text-white hover:border-black cursor-pointer"
                                    }`}
                            >
                                <ChevronLeft size={18} />
                                <span className="text-sm font-medium">Prev</span>
                            </button>

                            <span className="text-sm font-semibold text-gray-700">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 transition-all ${page === totalPages
                                    ? "opacity-50 cursor-not-allowed bg-gray-100"
                                    : "hover:bg-black hover:text-white hover:border-black cursor-pointer"
                                    }`}
                            >
                                <span className="text-sm font-medium">Next</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>


            </div>
        </>
    )
}
export default AllOrdersPage;