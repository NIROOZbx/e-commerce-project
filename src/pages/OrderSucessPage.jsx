import Lottie from "lottie-react"
import { ClipboardCheck } from "lucide-react"
import Truck from '../Truck.json';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

function OrderSuccessPage(){ 
    const navigate=useNavigate()
 
    const [counter,setCounter]=useState(4)


    useEffect(()=>{
        if(counter==0){
             navigate('/order',{replace:true})
             return
        }

        let timerid=setTimeout(()=>{
            setCounter(c=>c-1)
        },1000)

        return ()=>clearTimeout(timerid)

    },[navigate,counter])

    return( 
        <> 
        <Navbar/>
        <div className='flex flex-col items-center justify-center w-full h-screen'>
       
             
            <div className='flex justify-center'> 
         <Lottie animationData={Truck} loop={false}  className='w-50 h-40'/>
           </div>
         <div className='flex flex-col gap-1 justify-center'>
            <div className="flex gap-1"> 
         <p>Your order was successfuly completed</p>
         <ClipboardCheck color="#00dc37ff" strokeWidth={1.75} />
         </div>
         <p className="text-center">Redirecting to your page in {counter}</p>
         </div>
        
         
         
            
          </div>
           </>
    )

}

export default OrderSuccessPage