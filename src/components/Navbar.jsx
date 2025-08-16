import {CircleUserRound,ShoppingCart,Heart,Search} from 'lucide-react'
import '/src/styles/navbar.css'
import { useNavigate,NavLink } from 'react-router-dom'

function Navbar(){ 
    const navigate=useNavigate()

    return (
        <> 
        <div className='flex justify-between mt-4 mx-2 rounded-4xl px-2 py-3 bg-black' > 
        <div className='mx-3 ml-10'>
            <h1 className='text-white font-semibold'><b>JERSEY HUB</b></h1>
            </div>
        <div className="flex gap-13 lists">
            <li className='font-semibold'><NavLink to='/'> HOME</NavLink></li>
         <li className='font-semibold'><NavLink to='/products'> PRODUCTS </NavLink></li>
            <li className='font-semibold'>CONTACT</li>
            <li className='font-semibold'>SUPPORT</li>
        </div>

        <div className='flex gap-4 mr-10'>
            <Search size={20} color='white'/>
            <Heart size={20} color='white'/>
            <ShoppingCart size={20} color='white'/>
            <CircleUserRound size={20} color='white'/>
            
        </div>
        </div>

        </>
    )

}
export default Navbar