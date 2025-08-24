import { useContext } from "react"
import { OrderContext } from "../context/OrderContext"
import Navbar from "../components/Navbar"
import '/src/styles/orderspage.css'
import { Trash2 } from "lucide-react"
import { AuthContext } from "../context/AuthenticationContext"



function OrdersPage(){ 
    const {orderDetails,cancelOrder}=useContext(OrderContext)
     const{currentUserData}=useContext(AuthContext)
     

    

    return (
        <> 
        <Navbar/>
        <div className="w-full h-screen flex justify-center items-center"> 
            <div className="w-3/4 h-3/4  px-2">
            <div className="flex flex-row  font-bold text-2xl uppercase"> <p>Order History</p> </div> 
           <div className="mt-2"> 
        {orderDetails.map((items)=> { 
            return ( 
                <div key={items.id} className="mt-3 main-cont rounded-xl px-4 py-4"> 
                <div className="flex justify-center gap-10 mb-3"> 
                 <p className="font-bold">Order id : #{items.id}</p>
                 <p className="font-bold">Date: {items.date}</p>
                 <p className="font-bold">Total :{items.products[0].currency}{items.price}</p>
                 </div>
                 <div className=" rounded-xl "> 
                 {items.products.map((product)=> {
                    return (
                        <div key={product.id} className="flex gap-7"> 
                        <img  className="w-30 h-40 main-cont rounded-xl" src={product.image} alt="" />
                        <div className="flex flex-col gap-2"> 
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs"><span className="font-bold">Quantity</span> : {product.quantity}</p>
                        <p className="text-xs"><span className="font-bold">Status</span>: <span className={items.status==="Cancelled"?"text-red-500 rounded-4xl px-3 py-1 border-1":"text-green-500 rounded-4xl px-3 py-1 border-1"} >{items.status}</span></p>
                        <p className="text-xs mt-2"><span className="font-bold">Delivery</span> : <span className={items.status==="Cancelled"?"text-red-500 rounded-4xl px-3 py-1 border-1":"text-green-500 rounded-4xl px-3 py-1 border-1"}>{items.delivery}</span></p>
                        <p className="text-xs mt-2"><span className="font-bold">Deliver to</span> :{items.address.name} ,+91-{items.address.number} , {items.address.State} , 
                          {items.address.city}  , {items.address.address}</p>
                        <p className="text-xs mt-2"><span className="font-bold">Payment mode</span> : {items.payment}</p>
                        <div className="mt-3">
                        <button className={items.status==="Cancelled"?"flex items-center gap-2 bg-red-500 text-white px-7 py-1 rounded-lg hover:bg-red-600 font-semibold hidden":
                            "flex items-center gap-2 bg-red-500 text-white px-7 py-1 rounded-lg hover:bg-red-600 font-semibold"
                        } onClick={()=>cancelOrder(items.id)} >
                        <Trash2 color="#ffffff" strokeWidth={1.75} size={18} />
                            Cancel
                            </button>
                        </div>

                        </div>
                        </div>
                    )
                 })}
                 </div>
                 </div>
                
                )
        })} 
        </div>
            </div>
        </div>
         </>
        ) 


}

export default OrdersPage