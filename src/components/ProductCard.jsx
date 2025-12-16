import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import '/src/styles/cardcomp.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthenticationContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { Funnel } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { WishContext } from '../context/WishContext'
import Footer from './Footer'

import { SearchContext } from '../context/SearchContext'
import searchError from '../../src/assets/no-results.png'
import Lottie from 'lottie-react'
import trailLoading from "./../Trail loading.json";
import useWishlist from '../custom hook/useWishlist'
import { api } from '../api/api'
import useCartActions from '../custom hook/useCart'


function ProductCard() {
    const navigate = useNavigate()
   
    const [sortData, setSortData] = useState('')
    const [filterData, setFilterData] = useState('')
    const { getSearchData } = useContext(SearchContext)
    const { handleWishClick, isWishlisted } = useWishlist()
    const {isInCart,handleCartClick}=useCartActions()

    const [products, Setproducts] = useState([])

    const [loading, setLoading] = useState(false)

    const [page, SetPage] = useState(1)

   



    const ref = useRef({})


    async function getProducts() {

        setLoading(true)



        setTimeout(async () => {

            try {

                

                const { data } = await api.get(`/public/products?page=${page}&limit=12&filter=${filterData}&sort_by=${sortData}&se=${getSearchData}`)

                setLoading(false)

                ref.current = data
                Setproducts(data.data)

            } catch (err) {
               
            }

        }, 1000)

    }


    useEffect(() => {
        getProducts()
    }, [page, sortData, filterData, getSearchData])

    function handleNext() {

        SetPage((p) => p + 1)
    }

    function handlePrev() {
        SetPage((p) => p - 1)
    }



    function getSort(e) {
        setSortData(e.target.value)
    }

    function getFilter(e) {
        setFilterData(e.target.value)
    }

    let allData = [...products]






    if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24"> 
        <Lottie animationData={trailLoading} loop />
      </div>
    </div>
  );
}


    return (
        <>
       

            <p className="mt-20 text-center uppercase font-bold ">{allData.length} Products</p>

            <div className='flex justify-center mt-5 gap-10'>
                <select onChange={getSort} name="" id="" className='ml-2 border-1 rounded-xl p-1'>
                    <option value="" disabled selected hidden >Sort</option>
                    <option value="low" >Low - to - High</option>
                    <option value="high">High - to - Low</option>
                    <option value="Normal">Recently Added</option>
                    <option value="asc">Name: A-Z</option>
                    <option value="desc">Name: Z-A</option>
                    <option value="popular">Popular</option>
                </select>

                <select onChange={getFilter} name="" id="" className='ml-2 border-1 rounded-xl px-1'>
                    <option value="" disabled selected hidden>Filter</option>
                    <option value="laliga">Laliga</option>
                    <option value="premier">Premier League</option>
                    <option value="international">International</option>
                    <option value="serie">Serie A</option>
                    <option value="bundesliga">Bundesliga</option>
                    <option value="">Normal</option>
                </select>
            </div>
            {allData.length == 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <img src={searchError} alt="searxh not found" className="w-52 h-52 mb-6 opacity-80" />
                    <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
                    <p className="text-gray-500 mb-6">Search for other products</p>
                </div>

            ) : (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-4"> {/* main grid container */}
                    {allData.map((product) => {
                        return (
                            <div data-aos="fade-up"
                                key={product.id}
                                className="rounded-lg shadow-lg border border-gray-200 hover:shadow-lg transition bg-white card mt-3"
                            >
                                {/* Image Section */}
                                <div
                                    onClick={() => navigate(`/products/${product.id}`)}
                                    className="aspect-[3/4] relative cursor-pointer overflow-hidden bg-gray-50"
                                >
                                    <img
                                        className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${product.quantity == 0 && 'grayscale'}`}
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    {/* Wishlist Icon */}
                                    <span
                                        style={product.stock > 0 ? { display: "inline-block" } : { display: "none" }}
                                        onClick={(e) => {
                                            handleWishClick(e, product)

                                        }}
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

                                {/* Add to Cart */}
                                <div className="px-4 pb-4">
                                    <button
                                        onClick={() => {
                                            handleCartClick(product)
                                        }}
                                        className={`w-full rounded-full py-2 px-4 text-xs md:text-sm font-medium transition ${isInCart(product.id)
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
                </div>)}

            {/* main grid container div end */}

            <div className='flex justify-center gap-3 pt-10 items-center' >
                <button className={`border-1 p-1 bg-black text-white rounded-4xl ${ref.current.page == 1 ? "hidden" : "block"}`} onClick={handlePrev} ><ChevronLeft /></button>
                <p className={`font-bold ${ref.current.page == 1 ? "hidden" : "block"}`}>{ref.current.page}</p>
                <button className={`border-1 p-1 bg-black text-white rounded-4xl ${ref.current.page == ref.current.totalPages ? "hidden" : "block"}`} onClick={handleNext}><ChevronRight /></button>
            </div>

        </>
    )

}
export default ProductCard