import HomePageProducts from "../../components/HomePageProducts"
import Navbar from "../../components/Navbar"
import SlideComponent from "../../components/SlideComponent"
import Footer from "../../components/Footer"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthenticationContext"
import WhyChooseUs from "../../components/DetailsComponent"
import ChooseLeague from "../../components/ChooseLeague"
import Banner from "../../components/Banner"



function HomePage(){
   
    return( 
        <> 
        <Navbar/>
        <SlideComponent/>
        <ChooseLeague/>
        <Banner/>
        <HomePageProducts/>
        <WhyChooseUs/>
        <Footer/>
        

        </>
     )
     
}

export default HomePage