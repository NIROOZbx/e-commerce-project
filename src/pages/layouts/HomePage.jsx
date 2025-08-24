import HomePageProducts from "../../components/HomePageProducts"
import Navbar from "../../components/Navbar"
import SlideComponent from "../../components/SlideComponent"
import Footer from "../../components/Footer"



function HomePage(){
   

    return( 
        <> 
        <Navbar/>
        <SlideComponent/>
        <HomePageProducts/>
        <Footer/>
        

        </>
     )
     
}

export default HomePage