import {
    CircleUserRound,
    ShoppingCart,
    Heart,
    Search,
    Menu,
    X,
    LogOut,
    ShoppingBag,
    User2,
    Bell,
    Home,
    Contact,
    BellIcon,
    Phone,
    Info,
    UserCircleIcon,
} from "lucide-react";
import "/src/styles/navbar.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthenticationContext";
import { WishContext } from "../context/WishContext";
import { toast } from "sonner";
import { SearchContext } from "../context/SearchContext";
import { api } from "@/api/api";

function Navbar() {

    const navigate = useNavigate();

    const { cart, setCart } = useContext(CartContext);
    const { handleLogout, user } = useContext(AuthContext);
    const { setWishListed } = useContext(WishContext);
    const [showDetails, setShowDetails] = useState(false);
    const { wishListed } = useContext(WishContext);
    const [searchBar, setSearchBar] = useState(false);
    const [notification, setNotifications] = useState([]);
 


    const { setSearchData, searchData, setGetSearchData } =
        useContext(SearchContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };



    function removeCurrentUser() {
        if (window.confirm("Do you want to logout?")) {
            handleLogout();
            setCart([]);
            setWishListed([]);
        }
    }

    const getNotifications = async () => {
        try {
            let { data } = await api.get(`/api/notifications/`);
            setNotifications(data.notifications);
        } catch (e) {
            
        }
    };

    useEffect(() => {
        if (user) {
            getNotifications();
        }
    }, [user]);


    function changeSearchBar(e) {
        e.stopPropagation();

        setSearchBar(true);
    }

    function getSearchData(e) {
        setSearchData(e.target.value.toLowerCase());
        e.stopPropagation();
    }


    function searchClick() {
        setSearchData("");
        navigate("/products");
    }

    function getMatchingItems() {
        setGetSearchData(searchData);
        if (searchData) {
            searchClick();
        }
    }

    const unreadCount = notification.filter(n => !n.is_read).length;


    return (
        <div className="fixed top-0 left-0 w-full bg-white mt-4 z-50 ">
            <div className="rounded-4xl px-4 py-3 flex justify-between items-center bg-black mx-3 sm:px-8" onClick={() => setSearchBar(false)}>
                {/* Logo */}
                <div className={`${searchBar ? "hidden sm:block" : ""} ml-2 cursor-pointer`}>
                    <h1
                        className="text-white font-semibold sm:text-xl"
                        onClick={() => navigate("/")}
                    >
                        <b>JERSEY HUB</b>
                    </h1>
                </div>


                {/* Desktop Menu */}
                <ul
                    className="hidden md:flex gap-8 items-center text-white font-semibold"
                >
                    <li onClick={scrollToTop}>
                        <NavLink to="/">HOME</NavLink>
                    </li>
                    <li onClick={scrollToTop}>
                        <NavLink to="/products">PRODUCTS</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">CONTACT</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">ABOUT</NavLink>
                    </li>
                </ul>

                {/* Right Side (Icons + Login + Hamburger) */}
                <div className="flex gap-4 items-center">
                    {/* Search */}
                    {searchBar ? (
                        <div className="relative w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                            <input
                                className="w-full sm:w-auto bg-white rounded-4xl px-6 py-1 text-sm border border-gray-300"
                                value={searchData}
                                onChange={getSearchData}
                                placeholder="Search product..."
                                onClick={() => setSearchBar(true)}
                            />
                            <span className="absolute right-2.5 top-1.5">
                                <Search
                                    className="hover:cursor-pointer"
                                    onClick={getMatchingItems}
                                    size={18}
                                    color="black"
                                />
                            </span>
                        </div>
                    ) : (
                        <Search
                            onClick={changeSearchBar}
                            size={20}
                            color="white"
                            className="hover:cursor-pointer"
                        />
                    )}
                    {/* notification */}
                    <div
                        className="relative "
                        onClick={() => navigate('/notifications')}
                    >
                        <Bell size={20} color="white" className="hover:cursor-pointer" />

                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-3 h-3 flex items-center justify-center rounded-full font-bold text-white"></span>
                        )}
                    </div>


                    {/* notification */}
                    {/* Wishlist */}
                    <div className="relative hidden sm:hidden md:block">
                        <Heart
                            onClick={() => {
                                if (user) {
                                    navigate("/wishlist");
                                } else {
                                    toast.warning("Must login to view wishlist");
                                }
                            }}
                            size={20}
                            color="white"
                            className="hover:cursor-pointer"
                        />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold text-white">
                            {wishListed ? wishListed.length : 0}
                        </span>
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <ShoppingCart
                            onClick={() => {
                                if (user) {
                                    navigate("/cart");
                                } else {
                                    navigate("/login");
                                    toast.warning("Must login to view cart");
                                }
                            }}
                            size={20}
                            color="white"
                            className="hover:cursor-pointer"
                        />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold text-white">
                            {cart ? cart.length : 0}
                        </span>
                    </div>

                    {/* User Menu */}
                    {user && (
                        <div className="relative">
                            <CircleUserRound
                                onClick={() => setShowDetails(!showDetails)}
                                size={20}
                                color="white"
                                className="hover:cursor-pointer"
                            />
                            {showDetails && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                    <button className=" flex gap-2 items-center  w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-xl"
                                        onClick={() => navigate('/profile')}
                                    >
                                        <User2 size={18} />
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => navigate("/order")}
                                        className="flex gap-2 items-center  w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-xl"
                                    ><ShoppingBag size={18} color="#000000" />
                                        Orders
                                    </button>
                                    <button
                                        onClick={removeCurrentUser}
                                        className="flex gap-2 items-center  w-full text-left px-4 py-2  hover:bg-red-100 text-red-600 rounded-b-xl"
                                    >
                                        <LogOut size={16} color="#ff0000ff" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Login / Greeting */}
                    <span className="text-white capitalize hidden sm:hidden md:block">
                        {user ? (
                            `Hi ${user.name}`
                        ) : (
                            <Link
                                className="underline underline-offset-4 text-violet-400"
                                to="/login"
                            >
                                Login
                            </Link>
                        )}
                    </span>

                    {/* Hamburger (only on mobile) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {/* Small Mobile Popup Menu */}
            {mobileMenuOpen && (
                <div className="absolute right-3 top-16 md:hidden z-50">
                    <div className="bg-white w-56 rounded-2xl shadow-xl border border-gray-200 p-3">

                        <button onClick={() => navigate('/')}
                            className=" w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 font-medium flex gap-2 items-center">
                            <Home  size={18}/> Home
                        </button>

                        <button onClick={() => navigate('/products')}
                            className=" w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 font-medium flex gap-2 items-center">
                           <ShoppingBag size={18}/> Products
                        </button>

                        <button onClick={() => navigate('/contact')}
                            className=" w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 font-medium flex gap-2 items-center">
                          <Phone size={18}/> Contact
                        </button>

                        <button onClick={() => navigate('/wishlist')}
                            className=" w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 font-medium flex gap-2 items-center">
                           <Heart size={18}/> Wishlist
                        </button>

                        <button onClick={() => navigate('/about')}
                            className=" w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 font-medium flex gap-2 items-center">
                              <Info size={18}/> About
                        </button>

                        {user ? (
                            <div className="px-2 py-2 text-gray-700 font-medium flex gap-2 items-center">
                               <UserCircleIcon size={18}/> Hi {user.name}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="block w-full text-left px-4 py-2 mt-3 rounded-lg bg-violet-100 text-violet-600 font-medium">
                                Login
                            </button>
                        )}

                    </div>
                </div>
            )}

        </div>
    );
}
export default Navbar;
