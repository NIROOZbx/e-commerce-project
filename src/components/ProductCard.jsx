import {Heart} from 'lucide-react'
import '/src/styles/cardcomp.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthenticationContext'
import { useContext, useEffect, useState } from 'react'
import {Funnel} from 'lucide-react'
import { CartContext } from '../context/CartContext'
import { WishContext } from '../context/WishContext'
import Footer from './Footer'
import { toast } from 'react-toastify'
import { SearchContext } from '../context/SearchContext'
function ProductCard(){
    const navigate=useNavigate()
    const {products,currentUserData}=useContext(AuthContext)
    const {cart,setCart,addToCartInDatabase}=useContext(CartContext)
    const{wishListed}=useContext(WishContext)
    const [sortData,setSortData]=useState('')
    const [filterData,setFilterData]=useState('')
    const {getSearchData}=useContext(SearchContext)

    const {wishlistedProduct}=useContext(WishContext)


useEffect(() => {
  console.log("Products Page saw products change:", products);
}, [products])
 
    function addToCart(product){
        setCart([product,...cart])
    }
    function getSort(e){
        setSortData(e.target.value)
    }
    function getFilter(e){
        setFilterData(e.target.value)
    }
    let allData=[...products]

    
    if(filterData){ 
    allData=allData.filter((product)=>{ 

        if(product.league===filterData){ 
        return product.league===filterData 
        }

        if(filterData==="Normal"){
            return product
        }
     
    }

        
 )}
    
    if(sortData){
    allData=allData.toSorted((a,b)=>{
        if(sortData==="low"){
            return a.price-b.price
        }
        if(sortData==="high"){ 
            return b.price-a.price
        }
        if(sortData==="Normal"){
            return products
        }
    })
    }

    if(getSearchData){
        const search=getSearchData.toLowerCase()
     allData=allData.filter((item)=>item.team.toLowerCase().includes(search)
      || item.league.toLowerCase().includes(search)
      || item.name.toLowerCase().includes(search)
    )   
    } 
 


    return( 
        <>
        
        <p className="mt-20 text-center uppercase font-bold ">{allData.length} Products</p>
        
        <div className='flex justify-center mt-5 gap-10'> 
       <select onChange={getSort} name="" id="" className='ml-2 border-1 rounded-xl p-1'>
        <option value="" disabled selected hidden>Sort</option>
            <option value="low">Low - to - High</option>
            <option value="high">High - to - Low</option>
            <option value="Normal">Normal</option>
        </select>

        <select onChange={getFilter} name="" id="" className='ml-2 border-1 rounded-xl px-1'>
        <option value="" disabled selected hidden>Filter</option>
            <option value="Laliga">Laliga</option>
            <option value="Premier League">Premier League</option>
            <option value="International">International</option>
            <option value="Serie A">Serie A</option>
            <option value="Bundesliga">Bundesliga</option>
            <option value="Normal">Normal</option>
        </select>
        </div>
        {allData.length==0?( 
        <div className="flex flex-col items-center justify-center py-20">
       <img src="src/assets/no-results.png" alt="searxh not found" className="w-52 h-52 mb-6 opacity-80" />
      <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
      <p className="text-gray-500 mb-6">Search for other products</p>
      </div>

        ): (
           
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 px-11"> {/* main grid container */}
        {allData.map((product)=>{ 
            const isInCart=cart.some((item)=>item.id===product.id)
            const isInWishlist=wishListed.some((item)=>item.id===product.id)

            return (
                     
            <div  className='rounded-xl mt-5 p-5 card' key={product.id}>  {/* the card component div  */}
              
             <div onClick={()=> navigate(`/products/${product.id}`)} className=' aspect-[3/4] relative'> {/* the image div  */}
            <img className='rounded-xl w-full h-full object-cover' src={`https://ecommerce-api-3bc3.onrender.com${product.image}`}/> 
            <span
            style={product.quantity > 0 ? { display: "inline-block" } : { display: "none" }}
            onClick={(e) => {
                e.stopPropagation(); // Stop the click from navigating to the product page
                wishlistedProduct(product);
                if (!isInWishlist && currentUserData) {
                    toast.success("Successfully added product to wishlist");
                } else if (!currentUserData) {
                    navigate('/login');
                    toast.error("Must login");
                }
                if (isInWishlist) {
                    navigate('/wishlist');
                }
            }}
            // These classes position the icon and give it a nice background
            className='wish absolute -top-1 -right-3 bg-white/70 p-1.5 rounded-full hover:cursor-pointer '
        >
            {isInWishlist ? <Heart size={20} color="#ff0000ff" strokeWidth={1.5} fill="#ff0000ff" /> : <Heart size={20} />}
        </span>
            </div> {/* the image div end */}
           <div>  {/* the details div */}
            <p className='font-semibold mt-5'>{product.name}</p>
            <p className='mt-3'><b>{product.currency} {product.price.toFixed(2)}</b></p>
            </div> {/* the details div  end*/}
              <div className="flex flex-row items-center gap-2 mt-5 w-full py-3"> 
    
            <button onClick={()=> {
               if(!isInCart && currentUserData){ 
                    toast.success("Successfully added product to cart")
                
              }
                if(currentUserData){
                    if(product.quantity>0){ 
                addToCart(product) 
                addToCartInDatabase(product)
                }
                
                }else{
                   toast.error("Must login")
                    navigate('/login')
                } 
                 if(isInCart){
                    navigate('/cart')
                    return
                }
                
            }} 
               
             className="btn 
        bg-black text-white text-center font-semibold 
        whitespace-nowrap rounded-3xl py-2 px-3
        w-full /* Full width button */
        text-[10px] px-1 /* Mobile: tiny text to fit */
        xs:text-xs xs:px-2 /* A bit larger */
        sm:text-sm sm:px-3 /* Desktop: normal size */
        hover:cursor-pointer
        block" style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}}>{product.quantity>0?isInCart?"GO TO CART":" ADD TO CART":"OUT OF STOCK"}</button>
            {/* <span style={product.quantity>0?{display:"inline-block"}:{display:"none"}}  onClick={()=>{wishlistedProduct(product) 
            if(!isInWishlist && currentUserData){
                toast.success("Successfully added product to wishlist")
                
              }else{
                navigate('/login')
                toast.error("Must login")
              }
              if(isInWishlist){
                    navigate('/wishlist')
                }}
              
            } className='hover:cursor-pointer flex-shrink-0'>{isInWishlist?<Heart size={24} color="#ff0000ff" strokeWidth={1} fill="#ff0000ff" />:<Heart/>}</span> */}
            </div>
               </div> 
           

           
           ) } ) } 
           </div>)}
           {/* main grid container div end */}
         
            </>
    )

 }
 export default ProductCard