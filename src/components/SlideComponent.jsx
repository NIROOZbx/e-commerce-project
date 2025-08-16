import { useContext, useEffect, useState } from "react"
import '/src/styles/slidecomp.css'
import { AuthContext } from "../context/AuthenticationContext"
import axios from "axios"
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

    return (
            <>
            <div className="w-full h-screen flex  flex-col items-center p-5">
                <div className="">
                    <p className="font-bold text-2xl uppercase">Our Most Selling Products</p> 
                </div>

                
                <div className="mt-5 mb-20 px-9 w-full flex-1 min-h-0 flex justify-center">  
                    <img className=" rounded-3xl object-cover h-full w-full" src="/src/assets/fcb.png" alt="" />
                </div>
            </div>

            
        
        </>
    ) 

}

export default SlideComponent