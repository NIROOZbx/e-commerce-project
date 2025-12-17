import { AuthContext } from "../context/AuthenticationContext"
import { Heart } from "lucide-react"
import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import slideLoading from '../slideLoading.json'
import '/src/styles/cardcomp.css'
import Lottie from "lottie-react"
import { api } from "../api/api"
import useWishlist from "../custom hook/useWishlist"
import useCartActions from "../custom hook/useCart"

function HomePageProducts() {
    const { loading } = useContext(AuthContext)

    const [products, Setproducts] = useState([])
    const {handleWishClick,isWishlisted}=useWishlist()
    const{handleCartClick,isInCart}=useCartActions()
    const navigate = useNavigate()


    if (loading === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen flex-col items-center">
                <Lottie animationData={slideLoading} loop={true} />
                <p className="text-lg">Loading products ....</p>
            </div>
        );
    }


    async function getProducts() {
        const { data } = await api.get("/public/home-products")

        Setproducts(data)
    }
    useEffect(() => {
        getProducts()

    }, [])
   
    


    return (
        <>

            <h1 className="font-bold md:text-3xl text-xl uppercase px-4 mt-10 tracking-tighter">Newest Arrivals</h1>

            {/* ------------------------------------------------------------------------------------------ */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-4"> {/* main grid container */}
                {products?.map((product) => {
                    
                    

                    return (
                        <div data-aos="fade-up"
                            key={product.id}
                            className="rounded-lg border shadow-lg border-gray-200 hover:shadow-md transition bg-white card"
                        >
                            {/* Image Section */}
                            <div
                                onClick={() => navigate(`/products/${product?.id}`)}
                                className="aspect-[3/4] relative cursor-pointer overflow-hidden bg-gray-50"
                            >
                                <img
                                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${product?.stock == 0 && 'grayscale'}`}
                                    src={product?.image}
                                    alt={products.name}
                                />

                                {/* Wishlist Icon */}
                                <span
                                    onClick={(e) => {
                                       handleWishClick(e,product)
                                    }}
                                    style={product.stock > 0 ? { display: "inline-block" } : { display: "none" }}
                                    className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-sm hover:cursor-pointer"
                                >
                                    {isWishlisted(product.id) ? (
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
                                        {product.currency} {product.price.toFixed(2)}
                                    </p>
                                    {product.originalPrice > product.price && (
                                        <p className="text-gray-500 text-sm line-through">
                                            {product.currency} {product.originalPrice}
                                        </p>
                                    )}
                                </div>

                                {/* Product Name */}
                                <p className="text-base font-medium leading-snug truncate">{product.name}</p>

                                {/* Product Category */}
                                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                            </div>

                            {/* Add to Cart (Optional – not on Adidas grid, but if you want to keep it) */}
                            <div className="px-4 pb-4">
                                <button
                                    onClick={() => {
                                     handleCartClick(product)
                                    }}
                                    className={`w-full rounded-full py-2 px-4 md:text-sm font-medium transition text-xs  ${isInCart(product.id)
                                        ? "bg-white border border-black text-black hover:bg-gray-100"
                                        : "bg-black text-white hover:bg-gray-900"
                                        }`}
                                    disabled={product.stock <= 0}
                                >
                                    {product.stock > 0 ? (isInCart(product.id) ? "GO TO CART" : "ADD TO CART") : "OUT OF STOCK"}
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