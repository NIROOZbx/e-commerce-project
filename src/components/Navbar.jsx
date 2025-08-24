import {CircleUserRound,ShoppingCart,Heart,Search} from 'lucide-react'
import '/src/styles/navbar.css'
import { useNavigate,Link,NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthenticationContext'
import { WishContext } from '../context/WishContext'
import { toast } from 'react-toastify'
import { SearchContext } from '../context/SearchContext'

function Navbar(){ 
    const navigate=useNavigate()
    // const [cart,setCartCount]=useState(0)
    // const [wishlist,setWishlisttCount]=useState(0)
    const{cart,setCart}=useContext(CartContext)
    const {currentUserData,setCurrentUserData,products}=useContext(AuthContext)
    const{setWishListed}=useContext(WishContext)
    const [showDetails,setShowDetails]=useState(false)
    const{wishListed}=useContext(WishContext)
    const[searchBar,setSearchBar]=useState(false)
    const {setSearchData,searchData,setGetSearchData}=useContext(SearchContext)

    const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


    function removeCurrentUser(){
          localStorage.removeItem("userId");
          setCurrentUserData(null)
          setCart([])    
          setWishListed([])
          navigate('/')
    }
  
    function changeSearchBar(){ 
        setSearchBar(true)
    }

    function getSearchData(e){
        setSearchData(e.target.value.toLowerCase())
        e.stopPropogation()
    }

    function searchClick(){
        setSearchData('')
        navigate('/products')
    }

    function getMatchingItems(){
        setGetSearchData(searchData)
        if(searchData){
            searchClick()
        }
    }
  
    return (
        <> 
        <div className='fixed top-0 left-0 w-full bg-white mt-4 z-99'>
        <div className='rounded-4xl px-1 py-3 flex justify-between items-center bg-black mx-3' > 
        <div className='mx-3 ml-10' onClick={()=>setSearchBar(false)}> 
            <h1 className='text-white font-semibold ' onClick={()=>
                navigate('/')
                }><b>JERSEY HUB</b></h1>
            </div>
        <div onClick={()=>setSearchBar(false)} className="flex gap-13 lists" >
            <li onClick={scrollToTop} className='font-semibold text-white'><NavLink to='/'> HOME</NavLink></li>
         <li onClick={scrollToTop} className='font-semibold  text-white'><NavLink to='/products'> PRODUCTS </NavLink></li>
            <li className='font-semibold  text-white'><NavLink to='/contact'> CONTACT </NavLink></li>
            <li  className='font-semibold  text-white'><NavLink to='/about'> ABOUT </NavLink></li>
        </div>

        <div className='flex gap-4 mr-10' >
            {searchBar?
            <div className='relative'>
            <input className='bg-white rounded-xl px-6 hover:cursor-pointer' 
            value={searchData}
            onChange={getSearchData}
            placeholder='Enter product to search'
            onClick={()=>setSearchBar(true)}/>
            <span className='absolute right-2.5 top-0.5 rounded-4xl'><Search className='hover:cursor-pointer' onClick={getMatchingItems} size={20} color='black'/></span>  
            </div>:
            <Search onClick={changeSearchBar} size={20} color='white' className='hover:cursor-pointer'/>}


            <div className='relative'> 
            <Heart
            onClick={()=>{
                 if(currentUserData){ 
                navigate('/wishlist')
             }else{
               toast.warning("Must login to view wishlist")
             }

            }}
             size={20} color='white' className='hover:cursor-pointer'/>
            <span className='-top-2.5 bg-red-500 absolute text-xs w-2 h-4 flex items-center justify-center
             rounded-full px-2 font-bold'>{wishListed?wishListed.length:0}</span>
            </div>

            <div className='relative'> 
            <ShoppingCart onClick={()=>{ 
            if(currentUserData){ 
                navigate('/cart')
             }else{
                toast.warning("Must login to view cart")
             }}} size={20} color='white' className='hover:cursor-pointer'/>
            <span className='-top-2.5 bg-red-500 absolute text-xs w-2 h-4 flex items-center justify-center
             rounded-full px-2 font-bold'>{cart?cart.length:0}</span>
            </div>

           <div 
  style={currentUserData ? { display: "block" } : { display: "none" }} 
  className="relative"
> 
  <CircleUserRound  onClick={() => setShowDetails(!showDetails)}  size={20} color="white" className="hover:cursor-pointer"/>
  {showDetails && (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <button  onClick={() => navigate('/order')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"> Orders</button>
      <button  onClick={removeCurrentUser} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 text-red-600 rounded-b-xl">Logout </button>
    </div>
  )}
</div>

            <span className='text-white capitalize'>{currentUserData?`Hi ${currentUserData.name}`:<Link className='underline underline-offset-8 text-violet-500' to='/login'>Login</Link>}</span>
        
            
        </div>
        </div>

         </div>

        </>
    )

}
export default Navbar