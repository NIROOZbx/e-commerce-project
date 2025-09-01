import HomePageProducts from "../../components/HomePageProducts"
import Navbar from "../../components/Navbar"
import SlideComponent from "../../components/SlideComponent"
import Footer from "../../components/Footer"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthenticationContext"
import WhyChooseUs from "../../components/DetailsComponent"



function HomePage(){
   
    return( 
        <> 
        <Navbar/>
        <SlideComponent/>
        <HomePageProducts/>
        <WhyChooseUs/>
        <Footer/>
        

        </>
     )
     
}

export default HomePage