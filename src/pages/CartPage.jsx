import { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Plus, Minus, Trash2, BrushCleaning, Landmark } from "lucide-react";
import { AuthContext } from "../context/AuthenticationContext";
import Navbar from "../components/Navbar";
import '/src/styles/shipping.css'
import carts from '../assets/abandoned-cart.png';
import Footer from "../components/Footer";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import CheckOutPage from "./CheckOutPage";



function CartPage() {
  const { cart, removeFromCart,UpdateQuantity,orderPrice } = useContext(CartContext);

  const navigate=useNavigate()
  const [coupon,setCoupon]=useState(false)
  const [couponData,setCouponData]=useState('')
  const [applyCoupon,setApplyCoupon]=useState(false)
  const [discount, setDiscount] = useState(0);
  const [invalidCoupon,setInvalidCoupon]=useState(false)
  const ref=useRef(null)

const earliest = useMemo(() => Math.floor(Math.random() * 5) + 1, []);
const latest = useMemo(() => Math.floor(Math.random() * 10) + earliest + 1, [earliest]);


let shippingFee=0  

const couponMap = {
  NEW15: 15,
  NEW25: 25,
  NEW50: 50,
};


const applyCouponHandler = () => {
  const value = couponMap[couponData] || 0;
  if(!value){
    setInvalidCoupon(true)
  }else{ 
    setInvalidCoupon(false)
  }
  setDiscount(value);  // ✅ lock discount in state
  setCoupon(false);
  ref.current=couponData
  setApplyCoupon(true);
  setCouponData('')
};


console.log("Order total price ",orderPrice);





  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
      <h1 className="text-center text-3xl font-bold ">MY CART</h1>
            <hr className="w-20 mx-auto mt-3"/>

      {cart?.length===0?(  
      <div className="flex flex-col items-center justify-center py-20">
      <img 
        src={carts}
        alt="Empty cart" 
        className="w-52 h-52 mb-6 opacity-80"
      />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p></div>):
      ( 
      <div className="flex flex-col lg:flex-row gap-12 mt-7">
        <div className="w-full lg:w-2/3">
          <div className="space-y-6">
            {cart?.map((product) => (
              <div   data-aos="fade-up"  key={product.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg gap-6 shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
                <div className="w-32 h-32 flex-shrink-0">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-md" onClick={()=>navigate(`/products/${product.id}`)}/>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-500">{product.league}</p>
                  <p className="text-lg font-bold mt-2">{product.currency} {product.price.toFixed(2)}</p>
                  <p className="text-sm font-bold text-gray-500 mt-2">Delivery within {earliest} - {latest} days</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => UpdateQuantity(product.id,product.quantity-1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50" disabled={product.quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{product.quantity}</span>
                  <button onClick={() => UpdateQuantity(product.id,product.quantity+1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
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
        <div className="w-full lg:w-1/3"   data-aos="fade-up">
          <div onClick={(e)=> {
           
            setCoupon(false)
          }
          } style={cart?.length>0?{display:"block"}:{display:"none"}} className="bg-white p-6 rounded-lg shadow-md sticky top-24" >
            <h2 className="text-2xl font-bold mb-6 border-b pb-4" >Order Summary</h2>
            <div className="space-y-4">
              
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${orderPrice.current.toFixed(2)}</span>
                 
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

{/* coupon changing section */}

              {coupon?
              (<div className="flex flex-col gap-3 md:flex-row md:gap-4" onClick={(e) => e.stopPropagation()}> 
              <input onChange={(e)=>{
                setCouponData(e.target.value.toUpperCase())
              }} type="text" placeholder="Enter coupon code" className="rounded-lg px-4 py-2 border-1 " value={couponData}/>
                <button className="bg-black px-7 py-2 rounded-lg text-white font-bold uppercase" onClick={applyCouponHandler}>Apply</button>
                
                </div>
              ):
              (<span className="text-green-600" onClick={(e)=>{ 
                e.stopPropagation()
                setCoupon(true)
              }}>Apply coupon</span>)
              }

              {applyCoupon && !invalidCoupon &&
              <div className="flex justify-between mt-3">
                <span className="text-gray-600">Coupon discount :</span>
                <span className="font-semibold text-green-600 ">- $ {discount.toFixed(2)}</span>
              </div>
              }

              {invalidCoupon && <p className="text-red-500 mt-2">Invalid Coupon '{ref.current}' </p>}
             
{/* coupon changing section */}
              <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
                <span>Total</span>
                <span>${orderPrice.current.toFixed(2)}</span>
              </div>
            </div>
            <button
            onClick={()=>navigate("/checkout")}
             className="w-full bg-black text-white font-bold py-3 mt-8 rounded-lg hover:cursonr-pointer  transition-transform duration-300">
              Proceed to Checkout
            </button>

            

          </div>
        </div>
      </div>)}
    </div>


            
  
    </>
  )
}
export default CartPage;
