import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthenticationContext"
import axios from "axios"
import { api, jsonApi } from "../api/api"


export const OrderContext=createContext(null)


function OrderProducts({children}){

    const {role}=useContext(AuthContext)

    const[orderDetails,setOrderDetails]=useState([])

        async function fetchOrder() { 
            let {data}=await api.get(`/api/orders/`)
            setOrderDetails(data.orders)
            console.log("Fetching order useefffect")
      
        }

        useEffect(()=>{

            if (role=="user"){
                fetchOrder()
            }

        },[])
       
  
async function cancelOrder(itemID,orderID,cancelledReason){

    try{ 

       await api.patch(`/api/orders/${orderID}/cancel-order/${itemID}`,{"reason":cancelledReason})
        await fetchOrder()
    }catch(err){

    }

  
}


    return( 
        <OrderContext.Provider value={{orderDetails,setOrderDetails,cancelOrder,fetchOrder}}> 
        {children}
        </OrderContext.Provider>
    )

}
export default OrderProducts