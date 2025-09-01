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
      
        <h1 className="text-center font-bold text-3xl">Newest Arrivals</h1>
       
        <br />
        <hr className="w-50 mx-auto"/>
        {/* ------------------------------------------------------------------------------------------ */}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 px-11"> {/* main grid container */}
        {filteredProducts.map((products)=>{ 
           const isInCart=cart.some((item)=>item.id===products.id)
           const isInWishlist=wishListed.some((item)=>item.id===products.id)
           
            return (
                <>       
            <div  className='rounded-xl mt-5 p-5 card' key={products.id}>  {/* the card component div  */}
                       
             <div onClick={()=> navigate(`/products/${products.id}`)} className=' aspect-[3/4]'> {/* the image div  */}
            <img className='rounded-xl w-full h-full object-cover' src={products.image} key={products.id}/> 
            </div> {/* the image div end */}
           <div>  {/* the details div */}
            <p className='font-semibold mt-5'>{products.name}</p>
            <p className='mt-3'><b>{products.currency} {products.price.toFixed(2)}</b></p>
            </div> {/* the details div  end*/}
              <div className="flex flex-row items-center gap-2 mt-5 w-full py-3">
            <button onClick={()=>{ 
              if(!isInCart){ 
              toast.success("Successfully added product to cart")
              }
              if(currentUserData){ 
              addToCart(products)
              addToCartInDatabase(products)
              }else{
                 toast.warning("Must login before continuing")
                 navigate('/login')
              }
              if(isInCart){
                    navigate('/cart')
                }
              
              }} 
             className="btn 
        bg-black text-white text-center font-semibold 
        whitespace-nowrap rounded-3xl py-2 px-3
        w-full /* Full width button */
        text-[10px] px-1 /* Mobile: tiny text to fit */
        xs:text-xs xs:px-2 /* A bit larger */
        sm:text-sm sm:px-3 /* Desktop: normal size */
        hover:cursor-pointer
        block"
              style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}}>{products.quantity>0?isInCart?"GO TO CART":" ADD TO CART":"OUT OF STOCK"}</button>
            <span onClick={()=>{wishlistedProduct(products) 
              if(!isInWishlist){
                toast.success("Successfully added product to wishlist")
              }
              if(isInWishlist){

                    navigate('/wishlist')
                }}
              
            } style={products.quantity>0?{display:"inline-block"}:{display:"none"}} className='hover:cursor-pointer flex-shrink-0'>{isInWishlist?<Heart size={24} color="#ff0000ff" strokeWidth={1} fill="#ff0000ff" />:<Heart/>}</span>
            </div>
               </div> {/* the card component div end   */}

            </>
           ) } ) } 
           </div>{/* main grid container div end */}
        </>
    
    )
    
}

export default HomePageProducts