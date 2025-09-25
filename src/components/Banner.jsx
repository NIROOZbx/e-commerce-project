import { useNavigate } from 'react-router-dom'
import banner from '../../src/assets/banner.png'
import barca from '../../src/assets/FC_Barcelona_(crest).svg'
import liverpool from '../../src/assets/Liverpool_FC.svg.png'
import real from '../../src/assets/real-madrid.svg'
import manu from '../../src/assets/manu.png'
import arsenal from '../../src/assets/arsenal.png'
import bayern from '../../src/assets/bayern.svg'
import brazil from '../../src/assets/brazil.png'
import chelsea from '../../src/assets/chelsea.png'
import france from '../../src/assets/france.jpg'
import manc from '../../src/assets/manc.png'
import portugal from '../../src/assets/portugal.png'
import mobileBanner from '../../src/assets/banner-2.png'
import { useState } from 'react'
import { useWindowSize } from './useWindowSize';
import { CircleArrowRightIcon } from 'lucide-react'




function Banner(){
    const navigate=useNavigate()
    const { width } = useWindowSize();


    const clubs=[barca,real,liverpool,manu,arsenal,brazil,bayern,chelsea,france,manc,portugal]
    const duplicatedClubs = [...clubs, ...clubs, ...clubs];

    const bannerImg = width < 640 ? mobileBanner : banner;

    
    
    return (
      <div data-aos="fade-up"
            className={`
                relative w-full my-8 sm:my-12 flex flex-col justify-center items-center
                text-center h-[90vh] bg-cover bg-center
            `}
            style={{ backgroundImage: `url(${bannerImg})` }}
           
        >
        <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-black rounded-full"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-12 h-12 sm:w-24 sm:h-24 bg-black rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-black rounded-full"></div>
            <div className="absolute bottom-1/3 left-1/3 w-6 h-6 sm:w-12 sm:h-12 bg-black rounded-full"></div>
        </div>

        {/* LOGO SCROLLER (can remain absolute as it's decorative) */}
        <div className="absolute top-4 left-0 w-full overflow-hidden z-10" >
            <div className="flex gap-6 sm:gap-10 md:gap-12 animate-scroll px-3 sm:px-5 md:px-16" >
                {duplicatedClubs.map((image, index) => (
                    <div key={index} className='flex-shrink-0 my-7'>
                        <img src={image} alt="Club logo" className='w-8 h-8 sm:w-10 sm:h-10 md:w-20 md:h-20 object-contain'/>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content Container (positioned by Flexbox) */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 mt-5">
            <p data-aos="fade-up" className="tex text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight py-10 sm:py-10 leading-tight">
                AUTHENTIC JERSEYS AT AFFORDABLE RATES
            </p>
            <p data-aos="fade-up" className='mt-4 md:mt-5 text-xs sm:text-sm md:text-base italic max-w-xs sm:max-w-md lg:max-w-lg px-4 '>
                "Shop authentic jerseys from your favorite clubs and countries. Don't wait—get yours today!"
            </p>
            <button data-aos="fade-up"
            
                className="mt-6 px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 my-6 sm:my-10 rounded-md bg-black text-white text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors flex gap-2 items-center" 
                onClick={() => navigate('/products')}
                
            >
                SHOP NOW
                <CircleArrowRightIcon size={20} data-aos="fade-up"/>
            </button>
        </div>
    </div>
);

}

export default Banner