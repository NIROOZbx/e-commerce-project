import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthenticationContext"
import { useContext, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import '/src/styles/prodDetails.css'
import { CartContext } from "../../context/CartContext"
import Footer from "../../components/Footer"
import { WishContext } from "../../context/WishContext"
import { toast } from "react-toastify"


function ProductDetailsPage(){
    const {id}=useParams()
    const {products,currentUserData}=useContext(AuthContext)
    const [prod,setProd]=useState(null)
    const {cart,setCart,addToCartInDatabase}=useContext(CartContext)
    const {wishlistedProduct,wishListed}=useContext(WishContext)
    const navigate=useNavigate()
    
    console.log(prod)
    
    useEffect(()=>{ 
        const productData=products.find((product)=>product.id===parseInt(id))
        if (productData) {
            setProd(productData)
        }
    },[id,products])
    
    
    if(!prod){
        return <h1>Loading</h1>
    }
    const isInCart=cart.some((item)=>item.id===prod.id)
    const isInWishlist=wishListed.some((item)=>item.id===prod.id)

function addToCart(){
    if(currentUserData) { 
        setCart([prod,...cart])
        addToCartInDatabase(prod)
        }else{
            toast.warning("Must login")
            navigate('/login')
        }
        if(isInCart){
                    navigate('/cart')
                }
}

    return(
    <> 
    <Navbar/>
    <div className="h-screen w-full grid grid-cols-2 mt-13">
        <div className="h-screen w-full flex justify-center items-center py-15 px-25 ">
        <img className=" w-full h-full object-cover rounded-2xl image-section" src={prod.image} alt="" />
        </div>

        <div className="flex flex-col gap-8 mt-15">
            <p className="text-4xl font-bold">{prod.name}</p>
            <p className="text-xl font-semibold">{prod.description}</p>
            <p className="text-xl font-bold">{prod.currency} &nbsp; {prod.price.toFixed(2)}</p>
            <div className="flex gap-5 mr-4 span-container"> 
            <span className="border-2 border-solid px-3 py-2">S</span>
            <span className="border-2 border-solid px-3 py-2">M</span>
            <span className="border-2 border-solid px-3 py-2">L</span>
            <span className="border-2 border-solid px-3 py-2">XL</span>
            </div>
            <p className="text-green-500 font-bold">IN STOCK</p>
            <div className="flex gap-10 mt-3">

            <button style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}} onClick={addToCart} className="bg-black text-white rounded-3xl hover:cursor-pointer py-2 w-1/2 font-bold">{isInCart?"GO TO CART":"ADD TO CART"}</button>
            <button style={isInWishlist?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}}  onClick={()=>{ wishlistedProduct(products) 
                if(isInWishlist){
                    navigate('/wishlist')
                }
            } } className="bg-black text-white rounded-3xl hover:cursor-pointer py-2 w-1/2 mr-10 font-bold">{isInWishlist?"GO TO WISH LIST":"ADD TO WISHLIST"}</button>
            </div>

        </div>
    </div>
    <Footer/>
    </>
)

}

export default ProductDetailsPage