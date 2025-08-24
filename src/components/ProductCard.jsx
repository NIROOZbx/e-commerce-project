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
 
    function addToCart(product){
        setCart([product,...cart])
    }
    function getSort(e){
        setSortData(e.target.value)
    }
    function getFilter(e){
        setFilterData(e.target.value)
    }
    let allData=products

    
    if(filterData){ 
    allData=allData.filter((products)=>{ 

        if(products.league===filterData){ 
        return products.league===filterData 
        }

        if(filterData==="Normal"){
            return products
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
       <img src="/no-results.png" alt="searxh not found" className="w-52 h-52 mb-6 opacity-80" />
      <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
      <p className="text-gray-500 mb-6">Search for other products</p>
      </div>

        ): (
           
        <div className="grid grid-cols-4 gap-15 px-10 mt-3"> {/* main grid container */}
        {allData.map((products)=>{ 
            const isInCart=cart.some((item)=>item.id===products.id)
            const isInWishlist=wishListed.some((item)=>item.id===products.id)

            return (
                <>       
            <div  className='rounded-xl mt-5 p-5 card' key={products.id}>  {/* the card component div  */}
              
             <div onClick={()=> navigate(`/products/${products.id}`)} className=' aspect-[3/4]'> {/* the image div  */}
            <img className='rounded-xl w-full h-full object-cover' src={products.image} key={products.id}/> 
            </div> {/* the image div end */}
           <div>  {/* the details div */}
            <p className='font-semibold mt-5'>{products.name}</p>
            <p className='mt-3'><b>{products.currency} {products.price.toFixed(2)}</b></p>
            </div> {/* the details div  end*/}
              <div className="flex flex-row gap-5"> 
    
            <button onClick={()=> {
               if(!isInCart){ 
              toast.success("Successfully added product to cart")
              }
                if(currentUserData){
                addToCart(products) 
                addToCartInDatabase(products)
                
                
                }else{
                    alert("Must login")
                    navigate('/login')
                } 
                 if(isInCart){
                    navigate('/cart')
                }
                
            }} 
               
            className='bg-black text-white rounded-3xl px-16 py-2 hover:cursor-pointer mt-5 ml-0' style={isInCart?{backgroundColor:"white",color:"black"}:{backgroundColor:"black",color:"white"}}>{isInCart?"GO TO CART":" ADD TO CART"}</button>
            <span  onClick={()=>{wishlistedProduct(products) 
              if(isInWishlist){
                    navigate('/wishlist')
                }}
              
            }  className='mt-7 hover:cursor-pointer'>{isInWishlist?<Heart size={24} color="#ff0000ff" strokeWidth={1} fill="#ff0000ff" />:<Heart/>}</span>
            </div>
               </div> {/* the card component div end   */}

            </>
           ) } ) } 
           </div>)}
           {/* main grid container div end */}
         
            </>
    )

 }
 export default ProductCard