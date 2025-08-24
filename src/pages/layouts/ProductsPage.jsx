import { lazy,Suspense, useContext, useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Lottie from "lottie-react";
import trailLoading from "../../Trail loading.json";
import axios from "axios"

const ProductCard=lazy(()=>import ("../../components/ProductCard"))
import Footer from "../../components/Footer"

function ProductsPage(){
    
    

    return(  
        <> 
        <Navbar/>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <Lottie animationData={trailLoading} loop={true} />
          </div>
        }>
        <ProductCard/>
        </Suspense>
        <Footer/>
        
    </>
    )

}

export default ProductsPage