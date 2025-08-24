import { AuthContext } from "../context/AuthenticationContext"
import { Heart } from "lucide-react"
import { useContext } from "react"
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
    // const sortProducts=products.sort((a,b)=>a.price-b.price)

    function addToCart(product){
        setCart([product,...cart])
    }

    return( 
      <>
      
        <h1 className="text-center font-bold text-4xl">Newest Arrivals</h1>
       
        <br />
        <hr className="w-50 mx-auto"/>
        {/* ------------------------------------------------------------------------------------------ */}
        
        <div className="grid grid-cols-4 gap-15 p-10"> {/* main grid container */}
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
              <div className="flex flex-row gap-5"> 
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
              className='bg-black text-white rounded-3xl px-16 py-2 hover:cursor-pointer mt-5 ml-0' 
              style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}}>{isInCart?"GO TO CART":" ADD TO CART"}</button>
            <span onClick={()=>{wishlistedProduct(products) 
              if(!isInWishlist){
                toast.success("Successfully added product to wishlist")
              }
              if(isInWishlist){

                    navigate('/wishlist')
                }}
              
            } className='mt-7 hover:cursor-pointer'>{isInWishlist?<Heart size={24} color="#ff0000ff" strokeWidth={1} fill="#ff0000ff" />:<Heart/>}</span>
            </div>
               </div> {/* the card component div end   */}

            </>
           ) } ) } 
           </div>{/* main grid container div end */}
        </>
    
    )
    
}

export default HomePageProducts