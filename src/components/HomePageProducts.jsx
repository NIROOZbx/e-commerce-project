import { AuthContext } from "../context/AuthenticationContext"
import { Heart } from "lucide-react"
import { useContext, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { WishContext } from "../context/WishContext"
import { toast } from "react-toastify"
import '/src/styles/cardcomp.css'

function HomePageProducts(){
 const {products,currentUserData}=useContext(AuthContext)
    const newProd=products.filter((product)=>product.season===2026 || product.season===2025)
    const filteredProducts=newProd.slice(0,12)
    const {setCart,cart,addToCartInDatabase}=useContext(CartContext)
    const {wishlistedProduct,wishListed}=useContext(WishContext)
    const navigate=useNavigate()

    function addToCart(product){
        setCart([product,...cart])
    }


    return( 
      <>
      
        <h1 className="font-bold md:text-3xl text-xl uppercase px-4 mt-10 tracking-tighter">Newest Arrivals</h1>
        
        {/* ------------------------------------------------------------------------------------------ */}
        
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-4"> {/* main grid container */}
  {filteredProducts.map((products) => {
    const isInCart = cart.some((item) => item.id === products.id);
    const isInWishlist = wishListed.some((item) => item.id === products.id);

    return (
      <div
        key={products.id}
        className="rounded-lg border sahdow-lg border-gray-200 hover:shadow-md transition bg-white card"
      >
        {/* Image Section */}
        <div
          onClick={() => navigate(`/products/${products.id}`)}
          className="aspect-[3/4] relative cursor-pointer overflow-hidden bg-gray-50"
        >
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={`https://ecommerce-api-3bc3.onrender.com${products.image}`}
            alt={products.name}
          />

          {/* Wishlist Icon */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              wishlistedProduct(products);
              if (!isInWishlist && currentUserData) {
                toast.success("Successfully added product to wishlist");
              } else if (!currentUserData) {
                navigate("/login");
                toast.error("Must login");
              }
              if (isInWishlist) {
                navigate("/wishlist");
              }
            }}
            style={products.quantity > 0 ? { display: "inline-block" } : { display: "none" }}
            className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-sm hover:cursor-pointer"
          >
            {isInWishlist ? (
              <Heart size={22} color="#ff0000" strokeWidth={1} fill="#ff0000" />
            ) : (
              <Heart size={22} />
            )}
          </span>
        </div>

        {/* Details Section */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-1">
            <p className="text-red-600 font-semibold text-lg">
              {products.currency} {products.price.toFixed(2)}
            </p>
            {products.originalPrice > products.price && (
              <p className="text-gray-500 text-sm line-through">
                {products.currency} {products.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Product Name */}
          <p className="text-base font-medium leading-snug truncate">{products.name}</p>

          {/* Product Category */}
          <p className="text-sm text-gray-600 mt-1">{products.category}</p>
        </div>

        {/* Add to Cart (Optional – not on Adidas grid, but if you want to keep it) */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              if (!isInCart && currentUserData) {
                toast.success("Successfully added product to cart");
              }
              if (currentUserData) {
                addToCart(products);
                addToCartInDatabase(products);
              } else {
                toast.warning("Must login before continuing");
                navigate("/login");
              }
              if (isInCart) {
                navigate("/cart");
              }
            }}
            className={`w-full rounded-full py-2 px-4 md:text-sm font-medium transition text-xs  ${
              isInCart
                ? "bg-white border border-black text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            disabled={products.quantity <= 0}
          >
            {products.quantity > 0 ? (isInCart ? "GO TO CART" : "ADD TO CART") : "OUT OF STOCK"}
          </button>
        </div>
      </div>
    );
  })}
</div>

           
           {/* main grid container div end */}
        </>
    
    )
    
}

export default HomePageProducts