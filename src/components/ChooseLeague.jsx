import bundesliga from '../../src/assets/bundesliga.jpg'
import laliga from '../../src/assets/laliga.png'
import serieA from '../../src/assets/serieA.png'
import fifa from '../../src/assets/world-cup.webp'
import premierLeague from '../../src/assets/Premier-League-logo.png'


function ChooseLeague() {
  const leagues = [bundesliga, laliga, serieA, fifa, premierLeague]



  return (
    <>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Shop By League</p>
      
      <div className="w-full my-10 flex flex-col items-center">
        {/* Horizontal scrollable container */}
        <div className="w-full overflow-x-auto over">
          <div className="flex flex-row gap-3 p-4 justify-between"  data-aos="fade-up">
            {leagues.map((ele, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img 
                  src={ele} 
                  alt={`League ${index}`} 
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 object-contain rounded-2xl shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChooseLeague