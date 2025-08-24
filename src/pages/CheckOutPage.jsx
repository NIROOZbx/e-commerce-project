import { useCallback, useContext } from "react"
import { OrderContext } from "../context/OrderContext"
import { Currency, MapPin } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import '/src/styles/checkoutpage.css'
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"
import { useState } from "react"
import { AuthContext } from "../context/AuthenticationContext"
import axios from "axios"



function CheckOutPage(){

    const{shipData,setOrderDetails}=useContext(OrderContext)
    const {cart,setCart}=useContext(CartContext)
    const location=useLocation()
    const navigate=useNavigate()
    const{currentUserData}=useContext(AuthContext)

    const date = new Date();
    const formatted = date.toLocaleString("en-IN", {
    weekday: "short",   // Sat
    year: "numeric",    // 2025
    month: "short",     // Aug
    day: "numeric",     // 23
    hour: "2-digit",    // 09
    minute: "2-digit",  // 51
    hour12: false       // 24-hour format
    });

    
    const currentUserAddress=location.state.shippingDetails || shipData

    const priceTotal=cart.reduce((total,item)=>{ return total+item.price * (item.quantity || 1)},0)
    const shippingFee = priceTotal > 500 ? 0 : 50; // Example: Free shipping over $500
    const total = priceTotal + shippingFee;

    const currency=cart.map((item)=>item.currency)
    const dollar=currency.slice(0,1).join()

    const cartProducts=cart.map((items)=>items)
    console.log(cartProducts)

    const [payment,setPayment]=useState('')
    console.log(payment)

    function handlePay(e){
        setPayment(e.target.value)
    }
  
  const paymentType=payment==="cod"?"cod":"online"


    const handlePayment=async()=>{

        const existingOrders =currentUserData.order

        let orderData={
            id:Date.now(),
            price:total,
            payment:paymentType,
            date:formatted,
            status:"Success",
            delivery:"Processing",
            products:cartProducts,
            address:currentUserAddress
        }
        
        const updatedOrders=[...existingOrders,orderData]

        try{

        let {data:res}=await axios.patch(`http://localhost:5000/users/${currentUserData.id}`,{order:updatedOrders})

        if(res.order.length>0){
            let {data:res}=await axios.patch(`http://localhost:5000/users/${currentUserData.id}`,{cart:[]})
            setCart(res.cart)      
            setOrderDetails(res.order)
        }
        if(payment==="cod"){
            navigate('/ordersuccess',{replace:true})
        }
         }catch(e){
            console.log("Checkout fetching error")
         }

    }

    return( 
     <>
     <Navbar/>

    <div className="w-full h-screen flex justify-center items-center"> {/* main div of the page */}

        <div className="h-3/4 w-7xl  p-2 checkout rounded-xl overflow-auto"> {/* container div of the page */}
       
        <div className="flex p-3 justify-baseline address "> {/*  div of the address */}
        
         <MapPin size={20}/> 
        <span className="font-bold px-1">Address : </span>
          
         <span className="px-1 capitalize font-sans">{currentUserAddress.name} ,+91-{currentUserAddress.number} , {currentUserAddress.State} , 
             {currentUserAddress.city}  , {currentUserAddress.address}</span>
          </div>  {/*  div of the address */}

        
            <p className="mt-5 text-center font-bold">Products You've selected : </p>
            <div className="grid grid-cols-6 w-full  gap-5 mt-5 px-3 "> 
            {cart.map((items)=>{
                return (
                    <>
                    
                    <div>
                        <img onClick={()=> navigate(`/products/${items.id}`)} className="w-40 h-50 rounded-2xl object-contain images" src={items.image} alt="" />
                        <p className="font-semibold mt-2">{items.name}</p>
                        <p className="font-bold">{items.currency}{items.price.toFixed(2)}</p>
                        <p className="text-xs">Quantity : {items.quantity}</p>
                    </div> 
                    </>
                )
            })}
            
            </div>
            
            <div className="mt-6 ">
                <p className="font-bold text-center">Payment mode : </p>
                <div className="flex justify-center gap-5 py-3"> 
                    <div className="flex gap-2"> 
                    <input onChange={handlePay} type="radio" name="choice" value="cod" />
                    <p>Cash on delivery</p>
                    </div>
                    <div className="flex gap-2">
                    <input  onChange={handlePay} type="radio" name="choice" value="online" />
                    <p>Pay online</p>

                     </div>
                    
                    

                </div>
            </div>
    
            <div className="py-4 px-5 flex justify-between">
                <p style={cart.length>0?{display:"block"}:{display:"none"}} className="font-bold">Total : {dollar}{total} <span className="text-xs"> (Including shipping charge)</span></p>
                <button style={cart.length>0?{display:"block"}:{display:"none"}} onClick={handlePayment} className="border-1 bg-black text-white font-semibold py-1 px-4 hover:cursor-pointer">PLACE ORDER</button>
            </div>
        

        </div>{/* container div of the page end*/}



    </div> {/* main div of the page end */}
    
    </>
    )

}

export default CheckOutPage