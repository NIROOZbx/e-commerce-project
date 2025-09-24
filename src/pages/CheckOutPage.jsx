import { useCallback, useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Currency, MapPin, Truck, TruckIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "/src/styles/checkoutpage.css";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../api/api";
import cash from "../../src/assets/dollars.png";
import debitCard from "../../src/assets/credit-card.png";

function CheckOutPage() {
  const { shipData, setOrderDetails } = useContext(OrderContext);
  const { cart, setCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUserData } = useContext(AuthContext);

  const date = new Date();
  const formatted = date.toLocaleString("en-IN", {
    weekday: "short", // Sat
    year: "numeric", // 2025
    month: "short", // Aug
    day: "numeric", // 23
    hour: "2-digit", // 09
    minute: "2-digit", // 51
    hour12: false, // 24-hour format
  });

  const currentUserAddress = location.state.shippingDetails || shipData;
  const totalPrice = location.state.total || 0;

  const cartProducts = cart.map((items) => items);

  const [payment, setPayment] = useState("");

  function handlePay(e) {
    setPayment(e.target.value);
  }

  const paymentType = payment === "cod" ? "cod" : "online";

  const placeOrder = async () => {
    const existingOrders = currentUserData.order;

    let orderData = {
      id: Date.now(),
      price: totalPrice,
      payment: paymentType,
      date: formatted,
      status: "Success",
      delivery: "Processing",
      products: cartProducts,
      address: currentUserAddress,
    };

    const updatedOrders = [orderData, ...existingOrders];

    try {
      let { data: res } = await api.patch(`/users/${currentUserData.id}`, {
        order: updatedOrders,
      });

      if (res.order.length > 0) {
        let { data: res } = await api.patch(`/users/${currentUserData.id}`, {
          cart: [],
        });
        setCart(res.cart);
        setOrderDetails(res.order);
        navigate("/ordersuccess", { replace: true });
        console.log("Ordering onlline");
      }
    } catch (e) {
      console.log("Checkout fetching error");
    }
  };

  const handlePayment = () => {
    if (payment === "cod") {
      placeOrder();
    }

    if (payment === "online") {
      const options = {
        key: "rzp_test_edrzdb8Gbx5U5M",
        amount: totalPrice * 100,
        currency: "INR",
        name: "JERSEY HUB",
        description: "Payment for your order",

        handler: async function (response) {
          // Now that payment is successful, create the order in the database.
          await placeOrder();
          navigate("/ordersuccess", { replace: true });
        },
        prefill: {
          name: currentUserData.name,
          email: currentUserData.email,
          contact: currentUserAddress.number,
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

      <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4">
        {/* Main container */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6 sm:p-8 overflow-auto  my-20 checkout">
          {/* Address */}
          <div className="flex items-start gap-2 border-b border-gray-200 pb-4 mb-4">
            <TruckIcon size={22} className="text-violet-500 shrink-0" />
            <div className="flex">
              <p className="font-bold text-gray-800">Address:</p>
              <p className="text-gray-600 text-sm sm:text-base capitalize">
                &nbsp; {currentUserAddress.name}, +91-
                {currentUserAddress.number}, {currentUserAddress.State},{" "}
                {currentUserAddress.city}, {currentUserAddress.address}
              </p>
            </div>
          </div>

          {/* Products */}
          <h2 className="text-lg font-bold text-center text-gray-800">
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
                  src={`https://ecommerce-api-3bc3.onrender.com${items.image}`}
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
                      value="cod"
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
                        value="online"
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
                Total: ${totalPrice}
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
