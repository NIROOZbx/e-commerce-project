import { useContext, useEffect, useState } from "react"
import '/src/styles/slidecomp.css'
import { AuthContext } from "../context/AuthenticationContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function SlideComponent(){

// const {userID}= useContext(AuthContext)
// const [username,setUsername]=useState('')

// useEffect(()=>{
//     async function run(){ 
//     if(userID){
//         const {data:res}=await axios.get(`http://localhost:5000/users/${userID}`)
//         setUsername(res.name)
        
//     }
//     }
//     run()
//     [userID]})
   const navigate=useNavigate()

    return (
            <>
            <div className="w-full h-screen flex  flex-col items-center p-5 mt-14">
                <div className="">
                    <p className="font-bold text-2xl uppercase my-3">Our Most Selling Products</p> 

                     <hr className="w-60 mx-auto"/>
                </div>

                
                <div className="mt-7 mb-20 px-9 w-full flex-1 min-h-0 flex justify-center">  
                    <img className=" rounded-3xl object-cover h-full w-full" src="/src/assets/fcb.png" alt="" />
                    <button onClick={()=>navigate('/products/15')} className="absolute top-165 px-4 py-2 bg-white text-black font-bold  hover:cursor-pointer">SHOP NOW</button>
                </div>
            </div>

            
        
        </>
    ) 

}

export default SlideComponent