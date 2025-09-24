import {Heart} from 'lucide-react'
import '/src/styles/cardcomp.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthenticationContext'
import { useContext, useEffect, useState } from 'react'
import {Funnel} from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { WishContext } from '../context/WishContext'
import Footer from './Footer'
import { toast } from 'react-toastify'
import { SearchContext } from '../context/SearchContext'
import searchError from '../../src/assets/no-results.png'
import Lottie from 'lottie-react'
import trailLoading from "./../Trail loading.json";

function ProductCard(){
    const navigate=useNavigate()
    const {products,currentUserData,loading}=useContext(AuthContext)
    const {cart,setCart,addToCartInDatabase}=useContext(CartContext)
    const{wishListed}=useContext(WishContext)
    const [sortData,setSortData]=useState('')
    const [filterData,setFilterData]=useState('')
    const {getSearchData}=useContext(SearchContext)
    

    const {wishlistedProduct}=useContext(WishContext)



 
    function addToCart(product){
        setCart((prevCart) => {
    // prevent duplicates
    if (prevCart.some((item) => item.id === product.id)) {
      return prevCart; 
    }
    return [product, ...prevCart];
  });
    }
    function getSort(e){
        setSortData(e.target.value)
    }
    function getFilter(e){
        setFilterData(e.target.value)
    }
    let allData=[...products]

    
    if(filterData){ 
    allData=allData.filter((product)=>{ 

        if(product.league===filterData){ 
        return product.league===filterData 
        }

        if(filterData==="Normal"){
            return product
        }
     
    }

        
 )}
    
    if(sortData){
    allData=allData.toSorted((a,b)=>{
        if(sortData==="low"){
            return a.price-b.price
        }
        if(sortData==="high"){ 
            return b.price-a.price
        }
        if(sortData==="Normal"){
            return products
        }
    })
    }

    if(getSearchData){
        const search=getSearchData.toLowerCase()
     allData=allData.filter((item)=>item.team.toLowerCase().includes(search)
      || item.league.toLowerCase().includes(search)
      || item.name.toLowerCase().includes(search)
    )   
    } 
 
if (loading === "loading") {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={trailLoading} loop={true} />
    </div>
  );
}

    return( 
        <>
        
        <p className="mt-20 text-center uppercase font-bold ">{allData.length} Products</p>
        
        <div className='flex justify-center mt-5 gap-10'> 
       <select onChange={getSort} name="" id="" className='ml-2 border-1 rounded-xl p-1'>
            <option value="" disabled selected hidden >Sort</option>
            <option value="low" >Low - to - High</option>
            <option value="high">High - to - Low</option>
            <option value="Normal">Normal</option>
        </select>

        <select onChange={getFilter} name="" id="" className='ml-2 border-1 rounded-xl px-1'>
        <option value="" disabled selected hidden>Filter</option>
            <option value="Laliga">Laliga</option>
            <option value="Premier League">Premier League</option>
            <option value="International">International</option>
            <option value="Serie A">Serie A</option>
            <option value="Bundesliga">Bundesliga</option>
            <option value="Normal">Normal</option>
        </select>
        </div>
        {allData.length==0?( 
        <div className="flex flex-col items-center justify-center py-20">
       <img src={searchError} alt="searxh not found" className="w-52 h-52 mb-6 opacity-80" />
      <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
      <p className="text-gray-500 mb-6">Search for other products</p>
      </div>

        ): (
           
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-4"> {/* main grid container */}
  {allData.map((product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    const isInWishlist = wishListed.some((item) => item.id === product.id);

    return (
      <div
        key={product.id}
        className="rounded-lg shadow-lg border border-gray-200 hover:shadow-lg transition bg-white card mt-3"
      >
        {/* Image Section */}
        <div
          onClick={() => navigate(`/products/${product.id}`)}
          className="aspect-[3/4] relative cursor-pointer overflow-hidden bg-gray-50"
        >
          <img
          className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${product.quantity==0 && 'grayscale'}`}
            src={`https://ecommerce-api-3bc3.onrender.com${product.image}`}
            alt={product.name}
          />

          {/* Wishlist Icon */}
          <span
            style={product.quantity > 0 ? { display: "inline-block" } : { display: "none" }}
            onClick={(e) => {
              e.stopPropagation(); // stop card navigation
              wishlistedProduct(product);
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

          {/* Product Category */}
          <p className="text-sm text-gray-600 mt-1">{product.category}</p>
        </div>

        {/* Add to Cart (Optional – Adidas doesn’t use this in grid) */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              if (!isInCart && currentUserData) {
                toast.success("Successfully added product to cart");
              }
              if (currentUserData) {
                if (product.quantity > 0) {
                  addToCart(product);
                  addToCartInDatabase(product);
                }
              } else {
                toast.error("Must login");
                navigate("/login");
              }
              if (isInCart) {
                navigate("/cart");
              }
            }}
            className={`w-full rounded-full py-2 px-4 text-xs md:text-sm font-medium transition ${
              isInCart
                ? "bg-white border border-black text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            disabled={product.quantity <= 0}
          >
            {product.quantity > 0 ? (isInCart ? "GO TO CART" : "ADD TO CART") : "OUT OF STOCK"}
          </button>
        </div>
      </div>
    );
  })}
</div>)}

           {/* main grid container div end */}
         
            </>
    )

 }
 export default ProductCard