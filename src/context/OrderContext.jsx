import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthenticationContext"
import axios from "axios"
import api from "../api/api"

export const OrderContext=createContext(null)


function OrderProducts({children}){

    const {currentUserData}=useContext(AuthContext)
    const [shipData,setShipData]=useState({})
    const[orderDetails,setOrderDetails]=useState([])

   
    useEffect(()=>{ 
            async function run(){
                try{ 
                let {data:res}=await api.get(`users/${currentUserData.id}`)
                if(res.shippingAddress){
                setShipData(res.shippingAddress)
                 }
                 
            }catch(e){
                console.log("Error in fetching")

            }}
            run()
    },[currentUserData])

    useEffect(()=> {
        async function fetchOrder() { 
            let {data:res}=await api.get(`/users/${currentUserData.id}`)
            setOrderDetails(res.order)
            console.log("Fetching order useefffect")
      
        }
        fetchOrder()
    },[currentUserData])
  


   async function getShippingDetails(shippingData){

      await api.patch(`/${currentUserData.id}`,{shippingAddress:shippingData})
      
    }

async function cancelOrder(orderId){
   
    const updatedData=orderDetails.map((order)=>orderId===order.id ? {...order,status:"Cancelled",delivery:"Cancelled"}:order)

   let {data:res}= await api.patch(`/users/${currentUserData.id}`,{order:updatedData})
   setOrderDetails(res.order)
}


    return( 
        <OrderContext.Provider value={{getShippingDetails,shipData,orderDetails,setOrderDetails,cancelOrder}}> 
        {children}
        </OrderContext.Provider>
    )

}
export default OrderProducts