import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import profile from "../../src/assets/profile.png";
import cart from "../../src/assets/shopping-cart.png";
import money from "../../src/assets/money.png";
import box from "../../src/assets/box.png";
import delivery from "../../src/assets/delivery.png";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import {
    Calendar,
    CheckCircle,
  CircleX,
  Clock,
  Heart,
  LocateIcon,
  LucideListOrdered,
  LucideMove,
  Mail,
  MapPin,
  MapPinCheck,
  Package,
  ShoppingCartIcon,
  Truck,
  TruckIcon,
  User2,
  Wallet,
} from "lucide-react";
import api from "../api/api";
import PasswordPopup from "../components/ChangePassword";

function ProfilePage() {
  const { currentUserData, setCurrentUserData } = useContext(AuthContext);
  const [dataChange, setDataChange] = useState(false);
  const deliveredItems = currentUserData?.order.filter(
    (ele) => ele.delivery === "Delivered"
  );
  const totalSpent = deliveredItems?.reduce((accu, ele) => {
    return (accu += ele.price);
  }, 0);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editData, setEditData] = useState(currentUserData?.name);
  const [editEmail, setEditEmail] = useState(currentUserData?.email);
  const [popup, setPopup] = useState(false);
  



  function handlePopup(e) {
    e.stopPropagation();
    setPopup(true);
  }

  function handleChange(e) {
    e.stopPropagation();
    setToggleEdit(!toggleEdit);
    setEditData(currentUserData?.name);
    setEditEmail(currentUserData?.email);
  }
  function changeName(e) {
    setEditData(e.target.value);
  }

  async function handleSave() {
    try {
      await api.patch(`/users/${currentUserData?.id}`, {
        name: editData,
        email: editEmail,
      });

      setCurrentUserData((prev) => ({
        ...prev,
        name: editData,
        email: editEmail,
      }));
      setToggleEdit(!toggleEdit);
    } catch (e) {
      console.log("Error in updating name and email to the database");
    }
  }

  function changeEmail(e) {
    setEditEmail(e.target.value);
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Shipped': return <Truck className="w-5 h-5 text-blue-400" />;
      case 'Processing': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'Cancelled' :return <CircleX className="w-5 h-5 text-red-400" />
      default: return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-400 bg-green-400/20';
      case 'Shipped': return 'text-blue-400 bg-blue-400/20';
      case 'Processing': return 'text-yellow-400 bg-yellow-400/20';
      case 'Cancelled' :return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-25">
        {popup && <PasswordPopup setPopup={setPopup} />}
        <main className="flex-grow px-4 sm:px-10">
          {/* Profile Card */}
          <div
            className="p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 rounded-3xl shadow-lg backdrop-blur-sm animated-shadow bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setToggleEdit(false);
              setPopup(false);
            }}
          >
            <div className="flex-shrink-0">
              <img
                src={profile}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center items-start w-full">
              <p className="flex items-center gap-2 flex-wrap">
                <User2 size={20} />
                <span className="font-bold">Name:</span>
                {toggleEdit ? (
                  <input
                    onClick={(e) => e.stopPropagation()}
                    type="text"
                    className="border rounded-lg px-3 py-1 w-full md:w-auto"
                    value={editData}
                    onChange={changeName}
                  />
                ) : (
                  <span className="capitalize">{currentUserData?.name}</span>
                )}
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                <Mail size={20} />
                <span className="font-bold">Email:</span>
                {toggleEdit ? (
                  <input
                    onClick={(e) => e.stopPropagation()}
                    type="text"
                    className="border rounded-lg px-3 py-1 w-full md:w-auto"
                    value={editEmail}
                    onChange={changeEmail}
                  />
                ) : (
                  <span>{currentUserData?.email}</span>
                )}
              </p>

              <p className="text-sm sm:text-base flex items-center gap-2 flex-wrap">
                <MapPin size={20} />
                <span className="font-bold">Shipping Address:</span>
                <span className="break-words">
                  {currentUserData?.shippingAddress.name}, +91-
                  {currentUserData?.shippingAddress.number},{" "}
                  {currentUserData?.shippingAddress.State},{" "}
                  {currentUserData?.shippingAddress.city},{" "}
                  {currentUserData?.shippingAddress.address}
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                {toggleEdit ? (
                  <button
                    className="text-white bg-black px-5 py-1 rounded-lg"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="text-white bg-black px-5 py-1 rounded-lg"
                    onClick={handleChange}
                  >
                    Edit Details
                  </button>
                )}
                <button
                  className="text-white bg-black px-5 py-1 rounded-lg"
                  onClick={handlePopup}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white box-card rounded-xl p-5 flex items-center gap-4">
              <img
                src={cart}
                className="w-10 h-10 hover:animate-vertical-bounce"
              />
              <div>
                <p className="font-bold">Plus points</p>
                <p className="font-bold">{deliveredItems.length*100}</p>
              </div>
            </div>

            <div className="bg-white box-card rounded-xl p-5 flex items-center gap-4">
              <img src={delivery} className="w-10 h-10 truck" />
              <div>
                <p className="font-bold">Total orders</p>
                <p className="font-bold">{currentUserData?.order.length}</p>
              </div>
            </div>

            <div className="bg-white box-card rounded-xl p-5 flex items-center gap-4">
              <img src={money} className="w-10 h-10 hover:animate-sway" />
              <div>
                <p className="font-bold">Total spent</p>
                <p className="font-bold">${totalSpent.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-white box-card rounded-xl p-5 flex items-center gap-4">
              <img
                src={box}
                className="w-10 h-10 hover:animate-rotational-wave"
              />
              <div>
                <p className="font-bold">Delivered</p>
                <p className="font-bold">{deliveredItems?.length}</p>
              </div>
            </div>
          </div>
        </main>

        <div className="mx-4 md:mx-10 mt-10">
  <p className="py-3 backdrop-blur-xl animated-border    rounded-2xl px-3 font-bold text-xl flex gap-2 items-center">
    {/* Assuming TruckIcon is a component */}
    <TruckIcon className="truck"/>
    Recent orders
  </p>
  <div className="flex flex-col gap-4">
    {currentUserData.order.map((items) => (
      <div key={items.id} className="mt-5 px-3 py-5 rounded-xl animated-border">
        
        <div className="flex flex-col md:flex-row gap-4 py-2 items-start md:items-center justify-between px-2 md:px-5 flex-wrap">
          <p className="font-semibold">Order #{items.id}</p>

          <div className="flex gap-2 items-center">
            {getStatusIcon(items.delivery)}
            <p className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getStatusColor(items.delivery)}`}>
              {items.delivery}
            </p>
          </div>
          
          <p className="text-gray-700 text-xs md:text-sm uppercase flex gap-1 items-center"><Calendar size={16}/>{items.date}</p>
          <p className="font-bold text-sm md:text-md uppercase">Total: ${items.price.toFixed(2)}</p>
          <p className="font-bold text-xs md:text-sm uppercase">Payment: {items.payment}</p>
        </div>
        <hr />

        {items.products.map((product) => (
          <div key={product.id}>
            <div className="flex my-5 px-1 md:px-4 items-center">
              <img
                src={`https://ecommerce-api-3bc3.onrender.com${product.image}`}
                alt={product.name}
                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg cursor-pointer order-section hover:animate-scale"
              />
              <div className="flex flex-col gap-1 md:gap-3 px-3 md:px-5">
                <h4 className="text-black font-bold text-sm md:text-base">{product.name}</h4>
                <p className="text-black/70 text-xs md:text-sm">{product.league}</p>
                <p className="text-black/70 font-bold text-sm md:text-base">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>
        <Footer />
      </div>
    </>
  );
}

export default ProfilePage;
