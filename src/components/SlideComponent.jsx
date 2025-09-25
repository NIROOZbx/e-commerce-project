import { useContext, useEffect, useState } from "react"
import '/src/styles/slidecomp.css'
import { AuthContext } from "../context/AuthenticationContext"
import fcbImage from '../assets/fcbb.jpg';
import liverpoolImage from '../assets/liverpool.png';
import mancityImage from '../assets/MANCITY.png';
import realImage from '../assets/real.png';
import axios from "axios"
import { useNavigate } from "react-router-dom"
function SlideComponent(){

const arr = [fcbImage, liverpoolImage, mancityImage, realImage];
     const [currentIndex, setCurrentIndex] = useState(0);

       useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(interval);
  }, [arr.length]);

    return (
            <>

         <div className="w-full flex flex-col items-center py-8 md:p-5 md:pt-8 md:h-screen md:mt-14 mt-14" data-aos="fade-up">
                
                {/* Section Header */}
                <div className="text-center ">
  <h2 className="text-2xl font-bold tracking-tight text-zinc-800 md:text-3xl">
    Our Most Selling Products
  </h2>

  <div className="mx-auto mt-3 h-1 w-40 rounded-full bg-zinc-800"></div>
</div>

          
                <div className="mt-7 w-full px-4 flex justify-center md:flex md:justify-center sm:flex sm:justify-center md:min-h-0 md:mb-20 md:px-2">
                    

                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl cont">
                       
                        {/* This inner container is the "film strip" that slides */}
                        <div
                            className="h-full flex slide-container"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {/* Render all images inside the film strip */}
                            {arr.map((src, index) => (
                                <div key={index} className="w-full h-full flex-shrink-0">
                                    <img className="object-cover h-full w-full" src={src} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    ) 

}

export default SlideComponent