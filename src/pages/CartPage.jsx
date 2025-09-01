import { useContext, useEffect, useReducer, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Plus, Minus, Trash2, BrushCleaning, Landmark } from "lucide-react";
import { AuthContext } from "../context/AuthenticationContext";
import Navbar from "../components/Navbar";
import '/src/styles/shipping.css'
import Footer from "../components/Footer";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";


function reducer(state,action){
    switch(action.type){
        case 'GET_NAME':
            return {...state,name:action.payload}
        case 'GET_NUMBER':
            return {...state,number:action.payload}
        case 'GET_PINCODE':
            return {...state,pincode:action.payload}
        case 'GET_STATE':
          return {...state,State:action.payload}
         case 'GET_ADDRESS':
            return {...state,address:action.payload}
        case 'GET_CITY':
            return {...state,city:action.payload}
        default:
            return state
    
        } 
    
   

}

const initialValue={
    name:'',
    number:"",
    pincode:'',
    State:"",
    address:"",
    city:""
}
function CartPage() {
  const { cart, removeFromCart,increaseQuantity,decreaseQuantity } = useContext(CartContext);
  const[backgroundChange,setBackgroundChange]=useState(false)
  const {currentUserData}=useContext(AuthContext)
  const [value,dispatch]=useReducer(reducer,initialValue)
  const {getShippingDetails}=useContext(OrderContext)
  const navigate=useNavigate()

 
  
  // Calculate subtotal
  const subtotal = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  const shippingFee = subtotal > 500 ? 0 : 50; // Example: Free shipping over $500
  const total = subtotal + shippingFee;

  return (
    <>
    <Navbar/>
    <div style={backgroundChange?{opacity:"0.3"}:{opacity:"1"}}  className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <h1 className="text-center text-3xl font-bold ">MY CART</h1>
            <hr className="w-20 mx-auto mt-3"/>

      {cart.length===0?(  
      <div className="flex flex-col items-center justify-center py-20">
      <img 
        src="src/assets/abandoned-cart.png" 
        alt="Empty cart" 
        className="w-52 h-52 mb-6 opacity-80"
      />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p></div>):
      ( 
      <div className="flex flex-col lg:flex-row gap-12 mt-7" >
        <div className="w-full lg:w-2/3">
          <div className="space-y-6">
            {cart.map((product) => (
              <div key={product.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg gap-6 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
                <div className="w-32 h-32 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md"/>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-500">{product.league}</p>
                  <p className="text-lg font-bold mt-2">{product.currency} {product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => decreaseQuantity(product.id)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50" disabled={product.quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{product.quantity || 1}</span>
                  <button onClick={() => increaseQuantity(product.id)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={() => removeFromCart(product.id)} className="text-red-500 hover:text-red-700 transition p-2">
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3"  >
          <div style={cart.length>0?{display:"block"}:{display:"none"}} className="bg-white p-6 rounded-lg shadow-md sticky top-24" >
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={()=>setBackgroundChange(true)} className="w-full bg-black text-white font-bold py-3 mt-8 rounded-lg hover:cursonr-pointer  transition-transform duration-300">
              Proceed to Checkout
            </button>

            

          </div>
        </div>
      </div>)}
    </div>
    {backgroundChange && <div onClick={()=>setBackgroundChange(false)}  className="flex items-center justify-center w-full h-full absolute top-0 "> 
            <div className="absolute rounded-xl z-999999 shipping bg-white ">
            <form onSubmit={async(e)=> {
      
                e.preventDefault()
                await getShippingDetails(value)
                navigate('/checkout',{state:{shippingDetails:value,total:total}})  
                }} action="">
                <div onClick={(e)=> e.stopPropagation()} className="flex flex-col gap-2 details-shipping w-full p-10 gap-5"> 
                <p className="text-center font-bold text-xl">Enter your Shipping Details</p>
                <input value={value.name} onChange={(e)=>dispatch({type:"GET_NAME",payload:e.target.value})} type="text" className="p-3" placeholder="Enter your name" required autoFocus  autoComplete="name"/>
                <input value={value.number}  onChange={(e)=>dispatch({type:"GET_NUMBER",payload:e.target.value})} type="tel" pattern="[0-9]{10}" maxLength="10" className="p-3" placeholder="Enter your Mobile no."  required  autoComplete="tel"/>
                <div className="flex gap-5">
                <input value={value.pincode}  onChange={(e)=>dispatch({type:"GET_PINCODE",payload:e.target.value})} type="text" className="p-3" maxLength="6" placeholder="Pincode"   required autoComplete="postal-code"/>
                <input value={value.State} onChange={(e)=>dispatch({type:"GET_STATE",payload:e.target.value})} type="text" className="p-3" placeholder="State" required  autoComplete="address-level1"/>
                 </div>
                <input value={value.address}  onChange={(e)=>dispatch({type:"GET_ADDRESS",payload:e.target.value})} type="text" className="p-3" placeholder="Enter your address" required  autoComplete="street-address"/>
                <input value={value.city} onChange={(e)=>dispatch({type:"GET_CITY",payload:e.target.value})} type="text" className="p-3" placeholder="Enter your city"  required autoComplete="address-level2"/>
                <button className="bg-black text-white uppercase font-bold rounded-xl py-2">Submit</button>
                </div>
            </form>
            </div>
            </div>}
            
  
    </>
  )
}
export default CartPage;
