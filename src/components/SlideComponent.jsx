import { useContext, useEffect, useState } from "react"
import '/src/styles/slidecomp.css'
import { AuthContext } from "../context/AuthenticationContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function SlideComponent(){

   const navigate=useNavigate()
   const arr=['/src/assets/fcbb.jpg','src/assets/liverpool.png','src/assets/MANCITY.png','src/assets/real.png']
     const [currentIndex, setCurrentIndex] = useState(0);

       useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % arr.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(interval);
  }, [arr.length]);

    return (
            <>
            <div className="w-full h-screen flex  flex-col items-center p-5 mt-14">
                <div className="">
                    <p className="font-bold text-2xl uppercase my-3">Our Most Selling Products</p> 

                     <hr className="w-60 mx-auto"/>
                </div>

                
                {/* <div className="mt-7 mb-20 px-9 w-full flex-1 min-h-0 flex justify-center">  
                    <img key={currentIndex} className=" rounded-3xl object-cover h-full w-full animate-fadeIn" src={arr[currentIndex]} alt="" />
                </div>
            </div> */}

             <div className="mt-7 mb-20 px-9 w-full flex-1 min-h-0 flex justify-center">
                    {/* The sliding mechanism is now built inside your container. */}
                    <div className="w-full h-full rounded-3xl overflow-hidden">
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