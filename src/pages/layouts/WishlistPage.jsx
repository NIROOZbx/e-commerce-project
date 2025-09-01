import { useContext } from "react"
import { WishContext } from "../../context/WishContext"
import {Trash} from 'lucide-react'
import Navbar from "../../components/Navbar"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthenticationContext"
import { useNavigate } from "react-router-dom"
import '/src/styles/cardcomp.css'
import Footer from "../../components/Footer"



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
      <img  src="/wish-list.png" alt="Empty wishlist" className="w-52 h-52 mb-6 opacity-80"/>
      <h2 className="text-2xl font-semibold mb-2">Your wish list is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
      </div>
        ):( 
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 px-11"> {/* main grid container */}
        {wishListed.map((products)=>{ 
             const isInCart=cart.some((item)=>item.id===products.id)
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
    
            <button style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}} onClick={()=> {
                if(currentUserData){
                addToCartInDatabase(products)
                }else{
                    alert("Must login")
                    navigate('/login')
                } }} 
            className='"btn 
        bg-black text-white text-center font-semibold 
        whitespace-nowrap rounded-3xl py-2 px-3
        w-full /* Full width button */
        text-[10px] px-1 /* Mobile: tiny text to fit */
        xs:text-xs xs:px-2 /* A bit larger */
        sm:text-sm sm:px-3 /* Desktop: normal size */
        hover:cursor-pointer
        block card'>{isInCart?"GO TO CART":"ADD TO CART"}</button>
            <span  className='hover:cursor-pointer flex-shrink-0'>{<Trash onClick={()=>{
                removeFromWishlist(products.id)
            }}/>}</span>
            </div>
               </div> {/* the card component div end   */}

            </>
           ) } ) } 
           </div>)}
           {/* main grid container div end */}
           
            </>
    )

}

export default WishListPage