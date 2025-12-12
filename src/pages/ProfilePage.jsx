import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import profile from "../../src/assets/profile.png";
import cart from "../../src/assets/shopping-cart.png";
import money from "../../src/assets/money.png";
import box from "../../src/assets/box.png";
import check from "../../src/assets/check.png";
import delivery from "../../src/assets/delivery.png";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import uploading from "../loading circle.json"
import {
    ArrowRightIcon,
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
    Trash2,
    Truck,
    TruckIcon,
    User2,
    Wallet,
} from "lucide-react";

import PasswordPopup from "../components/ChangePassword";
import { api, jsonApi } from "../api/api";
import { OrderContext } from "../context/OrderContext";
import { toast } from "sonner";
import Lottie from "lottie-react";
import AddAddressModal from "../components/addAddressModal";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [currentUserData, setCurrentUserData] = useState({});

    const { user } = useContext(AuthContext)

    const { orderDetails } = useContext(OrderContext)
     const [showAddModal, setShowAddModal] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);
    const [addresses, setAddresses] = useState([])

    const [toggleEdit, setToggleEdit] = useState(false);
    const [editData, setEditData] = useState(currentUserData?.name);
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false)
    const [formLoading,setFormLoading]=useState(false)
    const navigate=useNavigate()

    const totalOrderPrice = orderDetails?.reduce((sum, item) => {
        return sum + item.total_price;
    }, 0)

    const deliveredCount = orderDetails.reduce((acc, ele) => {
        return ele.status === "delivered" ? acc + 1 : acc;
    }, 0);




    function handlePopup(e) {
        e.stopPropagation();
        setPopup(true);
    }

    function handleChange(e) {
        e.stopPropagation();
        setToggleEdit(!toggleEdit);
        setEditData(currentUserData?.name);
    }
    function changeName(e) {
        setEditData(e.target.value);
    }

    async function handleSave() {
        if (editData == currentUserData.name) {
            return
        }
        try {
            await api.patch(`/api/user/update-name`, {
                name: editData,
            });

            setCurrentUserData((prev) => ({
                ...prev,
                name: editData,
            }));
            setToggleEdit(!toggleEdit);
            toast.success("Username updated successfully")

        } catch (e) {
            
            toast.success("Failed to update username")
        }
    }


    async function GetUser() {
        try {
            const { data } = await api.get("/api/user/profile")

            setCurrentUserData(data)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        if (user) {
            GetUser()
        }

    }, [])

    async function uploadProfileImage() {
        if (!profileImage) {
            console.log("No image selected");
            return;
        }
        setLoading(true)

        const formData = new FormData();
        formData.append("image", profileImage);

        try {
            const { data } = await api.patch("/api/user/update-profile", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Profile Update Successfully")

            fileInputRef.current.value = "";
            GetUser()



        } catch (error) {
            toast.error("Something went wrong, try again");
        } finally {
            setLoading(false)
        }
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


    async function handleSetDefaultAddress(addressID) {

        try {
            const { data } = await api.patch(`/api/addresses/${addressID}`)
            setAddresses(prevAddresses => prevAddresses.map(addr => addr.id == addressID? {...addr,is_default:true}:{...addr,is_default:false} ));
            toast.success("Address updated successfully")
        } catch (error) {
            toast.success("Error in updating address")

        }

    }

    async function deleteAddress(addressID) {

        if (!window.confirm("Are you sure you want to delete this address?")) {
            return;
        }

        try {

            await api.delete(`/api/addresses/${addressID}`)
            setAddresses(prevAddresses => prevAddresses.filter(addr => addr.id !== addressID));
            toast.success("Address deleted successfully");

        } catch (err) {
            console.log("Err", err);

        }
    }


     async function handleAddAddress(newAddress) {

        setFormLoading(true)

        const requestData = {
            name: newAddress.name,
            phone: newAddress.number,
            street_address: newAddress.address,
            city: newAddress.city,
            state: newAddress.State,
            zip_code: newAddress.pincode,
            country: newAddress.country

        }

        setTimeout(async() => {
             try {
            await api.post("/api/addresses/", requestData);
            fetchAddress()
             setAddresses(prevAddresses => [...prevAddresses,requestData]);
             toast.success("Succesfully added address")
             setFormLoading(false)
              setShowAddModal(false)

        } catch (err) {

            toast.warning("Error in updating address,try again")

        }finally{
            setFormLoading(false)
        }
            
        }, 1500);

       


    }    


    return (
        <>
            <Navbar />
             <AddAddressModal
                            show={showAddModal}
                            onClose={() => setShowAddModal(false)}
                            onSubmit={handleAddAddress}
                            title="Add your address"
                            formLoading={formLoading}
                        />
            
            <div className="flex flex-col min-h-screen mt-25"  >
                {popup && <PasswordPopup setPopup={setPopup} />}
                <main className="flex-grow px-4 sm:px-10" >
                    {/* Profile Card */}
                    <div data-aos="fade-up"
                        className="p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 rounded-3xl shadow-lg backdrop-blur-sm  bg-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggleEdit(false);
                            setPopup(false);
                        }}
                    >
                        <div className="max-w-sm w-full mx-auto bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center gap-5">

                            {/* Profile Image */}
                            <div
                                className="relative group cursor-pointer w-full h-52 rounded-2xl overflow-hidden"
                                onClick={() => document.getElementById("profilePicInput").click()}
                            >
                                <img
                                    src={currentUserData.profile_image ? currentUserData.profile_image : profile}
                                    className="w-full h-full object-cover"
                                />

                                {/* Hover / Loading Overlay */}
                                {loading ? (
                                    <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-20">
                                        <Lottie animationData={uploading} loop={true} className="w-20 h-20" />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all z-10">
                                        <p className="text-white text-sm">Change Photo</p>
                                    </div>
                                )}
                            </div>

                            {/* Hidden File Input */}
                            <input
                                id="profilePicInput"
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => {
                                    setProfileImage(e.target.files[0]);
                                    uploadProfileImage();
                                }}
                            />

                            <div className="flex flex-col items-center w-full">
                                {!toggleEdit ? (
                                    <h2 className="text-xl font-semibold flex items-center gap-2 capitalize">
                                        {currentUserData?.name}
                                        <span className="text-green-500"><img className="w-7 h-7" src={check} alt="" /></span>
                                    </h2>
                                ) : (
                                    <input
                                        type="text"
                                        className="border px-3 py-1 rounded-lg w-full text-center"
                                        value={editData}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => changeName(e)}
                                    />
                                )}
                            </div>
                            {/* Stats Row */}
                            <div className="flex justify-between w-full text-center text-gray-700 mt-2">
                                <div className="flex flex-col">
                                    <span className="font-bold">{orderDetails?.length}</span>
                                    <span className="text-sm text-gray-500">Orders</span>
                                </div>

                                <div className="flex flex-col">

                                    <span className="font-bold">$ {totalOrderPrice}</span>
                                    <span className="text-sm text-gray-500">Spent</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-bold">{deliveredCount}</span>
                                    <span className="text-sm text-gray-500">Delivered</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                {!toggleEdit ? (
                                    <button
                                        className="text-sm sm:text-base text-black px-6 hover:text-gray-500 font-bold rounded-xl cursor-pointer"
                                        onClick={handleChange}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        className="text-sm sm:text-base text-black px-6 hover:text-gray-500 font-bold rounded-xl cursor-pointer"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                )}

                                <button
                                    className="text-sm sm:text-base font-bold px-5 py-2 rounded-xl cursor-pointer hover:text-gray-500 transition"
                                    onClick={handlePopup}
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                        <div className="w-full mt-6">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
    <h3 className="text-lg font-semibold">Your Addresses</h3>
    <h3
      onClick={() => setShowAddModal(true)}
      className="font-semibold text-sm underline text-fuchsia-950 cursor-pointer"
    >
      Add address
    </h3>
  </div>

  {addresses?.length > 0 ? (
    <div className="flex flex-col gap-3">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="p-4  rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 bg-white"
        >
          {/* Address Details */}
          <div className="flex flex-col flex-1 min-w-0 text-clip">
            <p className="font-semibold capitalize break-words">{addr.name}</p>
            <p className="text-sm text-gray-600 mt-1 break-words">
              {addr.street_address}, {addr.city}, {addr.state}, {addr.zip_code}, {addr.country} • {addr.phone}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-5 flex-shrink-0 mt-2 sm:mt-0 ">
            <button
              className={`px-3 py-1 rounded-lg text-sm ${addr.is_default
                ? "bg-green-600 text-white cursor-default"
                : "bg-black text-white"
                }`}
              disabled={addr.is_default}
              onClick={() => handleSetDefaultAddress(addr.id)}
            >
              {addr.is_default ? "Default" : "Set Default"}
            </button>

            <span
              className="text-red-600 cursor-pointer"
              onClick={() => deleteAddress(addr.id)}
            >
              <Trash2 />
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No address added yet.</p>
  )}

  <p
    className="flex self-end text-sm items-center underline font-bold mt-6 text-fuchsia-900 justify-end cursor-pointer"
    onClick={() => navigate("/order")}
  >
    Go to orders &nbsp; <ArrowRightIcon size={16} />
  </p>
</div>

                        

                    </div>
                   
                </main>


                <Footer />
            </div>
        </>
    );
}

export default ProfilePage;
