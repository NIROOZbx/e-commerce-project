import { useContext } from "react"
import { WishContext } from "../../context/WishContext"
import {Trash} from 'lucide-react'
import Navbar from "../../components/Navbar"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthenticationContext"
import { useNavigate } from "react-router-dom"
import wishlistIcon from '../../assets/wish-list.png';
import '/src/styles/cardcomp.css'




function WishListPage(){

    const{wishListed,removeFromWishlist}=useContext(WishContext)
    const {cart,setCart,addToCartInDatabase}=useContext(CartContext)
    const{currentUserData}=useContext(AuthContext)
    const navigate=useNavigate()
    

    return( 
        <>
        <Navbar/>
        <h1 className="font-bold text-2xl text-center mt-23">YOUR WISH LIST</h1>
        <hr className="w-30 mx-auto mt-3"/>
        {wishListed.length==0? ( 
        <div className="flex flex-col items-center justify-center py-20">
      <img  src={wishlistIcon} alt="Empty wishlist" className="w-52 h-52 mb-6 opacity-80"/>
      <h2 className="text-2xl font-semibold mb-2">Your wish list is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
      </div>
        ):( 
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-7 px-4 "> {/* main grid container */}
  {wishListed.map((product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    return (
      <div
        key={product.id}
        className="rounded-lg border border-gray-200 hover:shadow-md transition bg-white card"
      >
        {/* Image Section */}
        <div
          onClick={() => navigate(`/products/${product.id}`)}
          className="aspect-[3/4] relative cursor-pointer overflow-hidden bg-gray-50"
        >
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={`https://ecommerce-api-3bc3.onrender.com${product.image}`}
            alt={product.name}
          />

          {/* Trash Icon */}
          <span className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-sm hover:cursor-pointer">
            <Trash
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlist(product.id);
              }}
              size={20}
            />
          </span>
        </div>

        {/* Details Section */}
        <div className="p-4">
          {/* Price Section */}
          <div className="mb-1">
            <p className="text-red-600 font-semibold text-lg">
              {product.currency} {product.price.toFixed(2)}
            </p>
            {product.originalPrice > product.price && (
              <p className="text-gray-500 text-sm line-through">
                {product.currency} {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Product Name */}
          <p className="text-base font-medium leading-snug truncate">{product.name}</p>

          {/* Product Category (optional if you store it) */}
          {product.category && (
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="px-4 pb-4">
          <button
            style={
              isInCart
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "black", color: "white" }
            }
            onClick={() => {
              if (currentUserData) {
                addToCartInDatabase(product);
                navigate("/cart");
              } else {
                alert("Must login");
                navigate("/login");
              }
            }}
            className={`w-full rounded-full py-2 px-4 text-sm font-medium transition ${
              isInCart
                ? "bg-white border border-black text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isInCart ? "GO TO CART" : "ADD TO CART"}
          </button>
        </div>
      </div>
    );
  })}
</div>
        )}
           {/* main grid container div end */}
           
            </>
    )

}

export default WishListPage