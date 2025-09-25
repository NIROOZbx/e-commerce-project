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
} from "lucide-react";
import "/src/styles/navbar.css";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthenticationContext";
import { WishContext } from "../context/WishContext";
import { toast } from "react-toastify";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  
  const navigate = useNavigate();
  // const [cart,setCartCount]=useState(0)
  // const [wishlist,setWishlisttCount]=useState(0)
  const { cart, setCart } = useContext(CartContext);
  const { currentUserData, setCurrentUserData, handleForceLogout } =
    useContext(AuthContext);
  const { setWishListed } = useContext(WishContext);
  const [showDetails, setShowDetails] = useState(false);
  const { wishListed } = useContext(WishContext);
  const [searchBar, setSearchBar] = useState(false);
  const { setSearchData, searchData, setGetSearchData } =
    useContext(SearchContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (currentUserData && currentUserData.isAuthenticated === false) {
      handleForceLogout();
    }
  }, [currentUserData, handleForceLogout]);

  function removeCurrentUser() {
    if (window.confirm("Do you want to logout")) {
      localStorage.removeItem("userId");
      setCurrentUserData(null);
      setCart([]);
      setWishListed([]);
      navigate("/login");
    }
  }

  function changeSearchBar(e) {
    e.stopPropagation()
    setSearchBar(true);
  }

  function getSearchData(e) {
    setSearchData(e.target.value.toLowerCase());
    e.stopPropogation();
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

  return (
    <div className="fixed top-0 left-0 w-full bg-white mt-4 z-50 ">
      <div className="rounded-4xl px-4 py-3 flex justify-between items-center bg-black mx-3 sm:px-8" onClick={() => setSearchBar(false)}>
        {/* Logo */}
        <div
          className="ml-2 cursor-pointer"
          
        >
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
            <div className="relative w-full sm:w-auto"  onClick={(e) => e.stopPropagation()}>
              <input
                className="w-full sm:w-auto bg-white rounded-4xl px-6 py-1 text-sm border border-gray-300"
                value={searchData}
                onChange={getSearchData}
                placeholder="Search product..."
                onClick={(e) =>setSearchBar(true) }
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
<div className="relative hidden sm:hidden md:block" onClick={()=>navigate('/notifications')}>
  <Bell size={20} color="white" className="hover:cursor-pointer"/>
  <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-3 h-3 flex items-center justify-center rounded-full font-bold text-white"></span>
</div>


{/* notification */}
          {/* Wishlist */}
          <div className="relative">
            <Heart
              onClick={() => {
                if (currentUserData) {
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
                if (currentUserData) {
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
          {currentUserData && (
            <div className="relative">
              <CircleUserRound
                onClick={() => setShowDetails(!showDetails)}
                size={20}
                color="white"
                className="hover:cursor-pointer"
              />
              {showDetails && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <button className=" flex gap-2 items-center block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-xl"
                  onClick={()=>navigate('/profile')}
                  > 
                  <User2 size={18}/>
                  Profile
                  </button>
                  <button
                    onClick={() => navigate("/order")}
                    className="flex gap-2 items-center block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-xl"
                  ><ShoppingBag size={18} color="#000000" />
                    Orders
                  </button>
                  <button
                    onClick={removeCurrentUser}
                    className="flex gap-2 items-center block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 text-red-600 rounded-b-xl"
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
            {currentUserData ? (
              `Hi ${currentUserData.name}`
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
      {mobileMenuOpen && (
        <div
          className="
            absolute top-full left-0 w-full md:hidden 
            bg-black bg-opacity-90 backdrop-blur-sm shadow-lg 
            transform origin-top transition-transform duration-300 ease-in-out
        "
          style={{ transform: mobileMenuOpen ? "scaleY(1)" : "scaleY(0)" }} // Controls the animation
        >
          {/* Use flex column for better control over link styling */}
          <nav className="flex flex-col p-4 sm:text-center text-center">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-md text-white font-semibold hover:bg-gray-700 transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-md text-white font-semibold hover:bg-gray-700 transition-colors"
            >
              PRODUCTS
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-md text-white font-semibold hover:bg-gray-700 transition-colors"
            >
              CONTACT
            </Link>
            <Link to='/notifications' onClick={() => setMobileMenuOpen(false)}
              className="uppercase py-3 px-4 rounded-md text-white font-semibold hover:bg-gray-700 transition-colors">Notifications</Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-md text-white font-semibold hover:bg-gray-700 transition-colors"
            >
              ABOUT
            </Link>
            <div className="mt-3 text-white font-semibold">
              {currentUserData ? (
                <span className="block">Hi {currentUserData.name}</span>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block underline underline-offset-4 text-violet-400"
                >
                  Login
                </Link>
                
              )}
            </div>
         
              

          </nav>
        </div>
      )}
    </div>
  );
}
export default Navbar;
