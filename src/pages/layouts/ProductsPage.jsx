import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import axios from "axios"

function ProductsPage(){
    const [image,setImage]=useState([])

    useEffect(()=>{
        async function run() {
            let {data:res}=await axios.get("http://localhost:5000/products")
            setImage(res.map((ele)=>(ele.image)))

            
        }
        run()
    },[])
    console.log(image)

    return(  
        <> 
        <Navbar/>
        {image.map((image,index)=> <img src={image} key={index}/>  )}
    <h1>Welcome to products page</h1>
    </>
    )

}

export default ProductsPage