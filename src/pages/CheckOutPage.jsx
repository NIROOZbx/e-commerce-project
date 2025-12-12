import {useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import { Currency, MapPin, Truck, TruckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "/src/styles/checkoutpage.css";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { toast } from "sonner";
import cash from "../../src/assets/dollars.png";
import debitCard from "../../src/assets/credit-card.png";
import { api } from "../api/api";
import AddressModal from "../components/addressModal";
import AddAddressModal from "../components/addAddressModal";
import { NotificationContext } from "@/context/NotificationContext";

function CheckOutPage() {
    const {  fetchOrder } = useContext(OrderContext);
    const {getNotifications}=useContext(NotificationContext)
    const { cart,setCart, orderPrice } = useContext(CartContext);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState(null);


    const [addresses, setAddresses] = useState([])

    const [payment, setPayment] = useState("");

    function handlePay(e) {
        setPayment(e.target.value);
    }


    async function fetchAddress() {
        try {
            const { data } = await api.get("/api/addresses/")
            setAddresses(data)
        } catch (err) {
            console.log(err);
            
        }
    }

    useEffect(() => {
        if (user) {
            fetchAddress()
        }

    }, [])

    useEffect(() => {
        if (addresses.length > 0) {
            const def = addresses.find(a => a.is_default);
            setSelectedAddress(def);
        }
    }, [addresses]);

    async function handleAddAddress(newAddress) {
        console.log(newAddress);


        const requestData = {
            name: newAddress.name,
            phone: newAddress.number,
            street_address: newAddress.address,
            city: newAddress.city,
            state: newAddress.State,
            zip_code: newAddress.pincode,
            country: newAddress.country

        }

        try {
            await api.post("/api/addresses/", requestData);
            fetchAddress();

        } catch (err) {

            toast.warning(err.response.data.error)

        }



    }



    const handleAddressChange = (addr) => {
        setSelectedAddress(addr);
    };

    async function PlaceOrder() {
        try {
            await api.post("/api/orders/", { "address_id": selectedAddress?.id, "payment_method": payment })
            fetchOrder()
            getNotifications()
            setCart([])
            navigate("/ordersuccess", { replace: true });
             
        } catch (err) {
            console.log("Error in placing an order", err);

        }

    }


    const handlePayment = () => {

        if (payment === "COD") {
            PlaceOrder();
        }

        if (payment === "RAZORPAY") {
            console.log(window.Razorpay);
            
            if (!window.Razorpay) {
                toast.error("Payment service is still loading... Please wait.");
                return;
            }

            const options = {
                key: "rzp_test_edrzdb8Gbx5U5M",
                amount: orderPrice.current * 100,
                currency: "INR",
                name: "JERSEY HUB",
                description: "Payment for your order",

                handler: async function (response) {
                    PlaceOrder();
                    navigate("/ordersuccess", { replace: true });
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#343a40",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
    };






    return (
        <>
            <Navbar />

            <AddressModal
                show={showAddressModal}
                addresses={addresses}
                defaultAddressID={selectedAddress?.id}

                onClose={() => setShowAddressModal(false)}
                onSelect={
                    (addr) => {
                        handleAddressChange(addr);
                        setShowAddressModal(false);
                    }}
            />

            <AddAddressModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddAddress}
                 title="Enter your shipping details"
            />




            <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4">
                {/* Main container */}
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6 sm:p-8 overflow-auto  my-20 checkout">
                    {/* Address */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
  {/* Left section: Icon + Label + Address */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <div className="flex gap-2"> 
    <TruckIcon size={22} className="text-violet-500 shrink-0" />
    <p className="font-bold text-gray-800">Deliver to this address:</p>
    </div>
    
    {selectedAddress && (
      <p className="text-gray-700 text-sm sm:text-base capitalize break-words sm:ml-2">
        {selectedAddress.name} • {selectedAddress.phone} • {selectedAddress.street_address}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip_code}, {selectedAddress.country}
      </p>
    )}
  </div>

  {/* Right section: Buttons */}
  <div className="flex gap-2 mt-2 sm:mt-0">
    <p
      onClick={() => setShowAddressModal(true)}
      className="px-4 py-1 bg-black text-white rounded-md text-sm font-bold cursor-pointer"
    >
      CHANGE
    </p>
    <p
      onClick={() => setShowAddModal(true)}
      className="px-4 py-1 bg-black text-white rounded-md text-sm font-bold cursor-pointer"
    >
      ADD
    </p>
  </div>
</div>



                    {/* Products */}
                    <h2 className="text-lg font-bold text-center text-gray-800 mt-5">
                        Products You&apos;ve Selected
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 ">
                        {cart.map((items) => (
                            <div
                                key={items.id}
                                className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer images"
                                onClick={() => navigate(`/products/${items.id}`)}
                            >
                                <img
                                    className="w-full h-40 object-contain rounded-lg mb-3"
                                    src={items.image_url}
                                    alt={items.name}
                                />
                                <p className="font-semibold text-gray-700">{items.name}</p>
                                <p className="font-bold text-gray-900">
                                    {items.currency}
                                    {items.price.toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Quantity: {items.quantity}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Payment Mode */}
                    <div className="mt-8 text-center">
                        <p className="font-bold text-gray-800 mb-3">Select Payment Mode</p>
                        <div className="flex justify-center flex-wrap gap-6 ">
                            <div className=" rounded-xl payment">
                                <label className="flex flex-col gap-2 px-5 py-4 cursor-pointer">
                                    <div className="flex gap-2">
                                        <input
                                            onChange={handlePay}
                                            type="radio"
                                            name="choice"
                                            value="COD"
                                        />
                                        <span className="text-gray-700">Cash on Delivery</span>
                                        <img src={cash} alt="" className="h-6 w-6" />
                                    </div>

                                    <p className="text-sm text-gray-500 text-start">
                                        “Enjoy hassle-free payment — simply pay upon delivery.”
                                    </p>
                                </label>
                            </div>

                            <div className=" rounded-xl payment inset-ring">
                                <label className="flex flex-col gap-2 px-5 py-4 cursor-pointer">
                                    <div className="flex  flex-col gap-2">
                                        <div className="flex gap-2">
                                            <input
                                                onChange={handlePay}
                                                type="radio"
                                                name="choice"
                                                value="RAZORPAY"
                                            />
                                            <span className="text-gray-700">Pay Online</span>
                                            <img src={debitCard} alt="" className="h-6 w-6 " />
                                        </div>

                                        <p className="text-sm text-gray-500 text-start">
                                            "Enjoy hassle-free online payments with multiple options"
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Total & Place Order */}
                    {cart.length > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-4">
                            <p className="font-bold text-gray-800 mb-3 sm:mb-0">
                                Total: ${orderPrice.current.toFixed(2)}
                                <span className="text-xs text-gray-500">
                                    {" "}
                                    (Including shipping)
                                </span>
                            </p>
                            <button

                                onClick={handlePayment}

                                className="animate-vertical-bounce bg-black hover:cursor-pointer text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                            >
                                PLACE ORDER
                            </button>
                        </div>
                    )}
                </div>

            </div>

        </>
    );
}

export default CheckOutPage;
