import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import Navbar from "../components/Navbar";
import '/src/styles/orderspage.css';
import { History, Package, PackageCheck, PackageX, Trash2 } from "lucide-react";
import { AuthContext } from "../context/AuthenticationContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ReviewModal from "@/components/ReviewModal";
import { api } from "@/api/api";
import { toast } from "sonner";
import CancelModal from "@/components/cancelPopup";

const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) { // Normalize case
        case "pending":
        case "processing":
            return { icon: <History size={20} />, color: "text-yellow-500", label: "Processing" };
        case "shipped":
            return { icon: <Package size={20} />, color: "text-blue-500", label: "Shipped" };
        case "delivered":
            return { icon: <PackageCheck size={20} />, color: "text-green-500", label: "Delivered" };
        case "cancelled":
            return { icon: <PackageX size={20} />, color: "text-red-500", label: "Cancelled" };
        default:
            return { icon: <History size={20} />, color: "text-gray-500", label: status };
    }
};

// Helper to format ISO date string
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

function OrdersPage() {
    const { orderDetails, cancelOrder } = useContext(OrderContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false)

    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);


    const handleSubmitReview = async (productID) => {

        setLoading(true)


        setTimeout(async () => {
            try {
                console.log("Adding review to database");
                let { data } = await api.post(`/api/review/${productID}`, { "comment": reviewText })
                setLoading(true)
                setIsModalOpen(false)
                toast.success("Review added successfully")

            } catch (e) {
                toast.success("Something went wrong")

            } finally {
                setLoading(false)
            }

        }, 1000);



    };

    const confirmCancel = () => {
        if (!selectedItem) return;

        cancelOrder(selectedItem.item_id, selectedItem.order_id, cancelReason);

        toast.success("Order cancelled successfully");
        setIsCancelOpen(false);
        setCancelReason("");
    };




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
                    {orderDetails.length > 0 ? (
                        <div className="space-y-8">
                            {orderDetails.map((order) => {


                                return (
                                    <div data-aos="fade-up" key={order.order_id} className="bg-white rounded-2xl shadow-lg overflow-hidden main-cont">
                                        {/* Order Header */}
                                        <div className="bg-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b ">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600">ORDER ID</p>
                                                <p className="font-mono text-gray-800">#{order.Reference}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600">DATE PLACED</p>
                                                <p className="text-gray-800">{formatDate(order.order_date)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-600">TOTAL AMOUNT</p>
                                                <p className="text-xl font-bold text-gray-900">${order.total_price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        {/* Products in the Order */}
                                        <div className="p-4 sm:p-6 space-y-6">
                                            {order.items.map((item) => {
                                                let displayStatus = item.item_status;

                                                if (displayStatus === 'active' || displayStatus === 'pending') {
                                                    displayStatus = order.status;
                                                }

                                                const statusInfo = getStatusDetails(displayStatus);

                                                return (
                                                    <div key={item.item_id} className="grid grid-cols-1 md:grid-cols-[100px,1fr,auto] gap-6 items-start">
                                                        {/* Product Image */}
                                                        <img
                                                            className="w-24 h-24 object-cover rounded-lg cursor-pointer cont"
                                                            src={item.image_url}
                                                            alt={item.product_name}
                                                            onClick={() => navigate(`/products/${item.product_id}`)}
                                                        />

                                                        {/* Product Details */}
                                                        <div>
                                                            <p className="font-bold text-lg text-gray-800">{item.product_name}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                            <p className="text-sm font-semibold text-gray-700 mt-1">${item.price}</p>

                                                            <div className="mt-4">
                                                                <p className="font-semibold text-sm">DELIVER TO:</p>
                                                                <p className="text-gray-600 text-sm capitalize">
                                                                    {order.address.name}, {order.address.street_address}, {order.address.city}, {order.address.state}, {order.address.zip_code}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Status and Cancel Button */}
                                                        <div className="flex flex-col items-start md:items-end gap-4">
                                                            <div className={`flex items-center gap-2 font-bold text-lg ${statusInfo.color}`}>
                                                                {statusInfo.icon}
                                                                <span className="capitalize">{statusInfo.label}</span>
                                                            </div>
                                                            {order.status === "pending" && item.item_status !== "cancelled" && item.item_status !== "delivered" &&(
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedItem({ item_id: item.item_id, order_id: order.order_id });
                                                                        setIsCancelOpen(true);

                                                                    }}
                                                                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold text-sm transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                    Cancel
                                                                </button>

                                                            )}
                                                            {order.status === "delivered" && item.item_status !== "cancelled" && (
                                                                <button
                                                                    onClick={() => {
                                                                        setCurrentProductId(item.product_id);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-semibold text-sm"
                                                                >
                                                                    Leave Review
                                                                </button>
                                                            )}

                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Empty State
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
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                review={reviewText}
                setReview={setReviewText}
                onSubmit={() => handleSubmitReview(currentProductId)}
                loading={loading}
            />

            <CancelModal
                isOpen={isCancelOpen}
                onClose={() => setIsCancelOpen(false)}
                reason={cancelReason}
                setReason={setCancelReason}
                onConfirm={confirmCancel}
            />


            <Footer />
        </>
    );
}

export default OrdersPage;