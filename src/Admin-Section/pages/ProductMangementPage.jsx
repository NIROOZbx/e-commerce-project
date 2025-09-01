import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import { Edit, Trash2, PlusCircle, MoveUp, Search, PackageX, Package } from 'lucide-react';
import '/src/styles/prodmanagement.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import prroducts from '../../Product.json'
import Lottie from "lottie-react";
import api from "../../api/api";


function getProductData(state,action) {

    switch(action.type) {
            case 'SET_FORM_DATA':
                 return action.payload;
        
            case 'PRODUCT_NAME':
                return {...state,name:action.payload}
        
            case 'PRODUCT_TEAM':
                 return {...state,team:action.payload}

            case 'PRODUCT_LEAGUE':
                 return {...state,league:action.payload}

            case 'PRODUCT_SEASON':
                 return {...state,season:action.payload}

            case 'PRODUCT_QUANTITY':
                 return {...state,quantity:action.payload}

            case 'PRODUCT_PRICE':
                 return {...state,price:action.payload}                

            case 'PRODUCT_IMAGE':
                return {...state,image:action.payload}

            case 'PRODUCT_DESCRIPTION':
                return {...state,description:action.payload}

            default:
                return state
        }

}

const initValue={ 
    name:'',
    team:'',
    league:'',
    season:0,
    quantity:0,
    price:0,
    currency:"$",
    image:'',
    category:"Home",
    description:''

}
function ProductManagementPage() {
   
    const {products,setProducts} = useContext(AuthContext);
    const [formchange,setFormChange]=useState(false)
    const [editProduct,setEditProduct]=useState(null)
    const [value,dispatch]=useReducer(getProductData,initValue)
    const [submissionStatus,setSubmissionStatus]=useState('idle')
    const[searchData,setSearchData]=useState('')

    const[getSearchData,setGetSearchData]=useState('')



    useEffect(()=>{
        if(formchange){ 
            if(editProduct) {
                dispatch({type:'SET_FORM_DATA',payload:editProduct})
            }else{
                 dispatch({type:'SET_FORM_DATA',payload:initValue})
            }
        }

    },[editProduct,formchange])

    
useEffect(() => { 
    if (submissionStatus === 'finished') {
       
        const timer = setTimeout(() => {
            setFormChange(false);
            setEditProduct(null);
            setSubmissionStatus('idle'); 
        }, 2500); 

        
        return () => clearTimeout(timer);
    }
}, [submissionStatus]); 

    const handleAddProduct =async (e) => {
        e.preventDefault()
        setSubmissionStatus('submitting')
        
        if(editProduct){ 
            let {data:updatedProduct}=await api.patch(`/products/${editProduct.id}`,value)
            setProducts(prevProd=>prevProd.map(prod=> prod.id===updatedProduct.id?updatedProduct:prod))

        }else{
        let {data:newProduct}=await api.post("/products",value)
        
        setProducts(prevProduct=>[...prevProduct,newProduct])
    }
    
    setSubmissionStatus('finished')
    };

    const handleEditProduct = (productId) => {
       
        const productToEdit=products.find((product)=>product.id===productId)
        if(productToEdit) {
            setEditProduct(productToEdit)
            setFormChange(true)
        }
       
    };

    
    const handleDeleteProduct = async (productId) => {

         if(window.confirm(`Are you sure you want to delete the product`)){ 
        await api.delete(`/products/${productId}`)

        setProducts(prevProd=>prevProd.filter(prod=>prod.id!==productId))
        }
    };

    let allData=products
     if(getSearchData){
        const search=getSearchData.toLowerCase()
     allData=allData.filter((item)=>item.team.toLowerCase().includes(search)
      || item.league.toLowerCase().includes(search)
      || item.name.toLowerCase().includes(search)
    )   
    } 

    const totalProducts = products.length
    const outOfStock = products.filter(p => p.quantity === 0).length

    return (
        <>
        <div className=" bg-gray-50 h-screen px-15">
            
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8 relative">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                <div className='relative'>
            <input onChange={(e)=>setSearchData(e.target.value)} type="text" className="px-3  py-1 w-90 rounded-3xl" value={searchData} placeholder='Enter product to search'/>
            <span className='absolute right-2.5 top-1 rounded-4xl'>
            <Search onClick={()=>{ 
                setGetSearchData(searchData)
                 setSearchData('')
            }} className='hover:cursor-pointer'  size={20} color='black'/></span>  
            </div>
                <button
                    onClick={()=>{
                        setFormChange(true)
                        setEditProduct(null)
                    }}
                    className="flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md  hover:bg-[#2f3030] transition-colors duration-300"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Add New Product
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
                    <Package className="text-blue-500 w-10 h-10 mr-4" />
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
                    <PackageX className="text-red-500 w-10 h-10 mr-4" />
                    <div>
                        <p className="text-sm text-gray-500">Out of Stock</p>
                        <p className="text-2xl font-bold text-gray-800">{outOfStock}</p>
                    </div>
                </div>
            </div>
           
            {/* Products Table */}
            <div className="bg-white rounded-lg overflow-hidden div1">
                <div className="fixed bottom-5 right-5 shadow-lg p-2 rounded-full bg-black cursor-pointer">
                    <MoveUp onClick={()=>  window.scrollTo({ top: 0, behavior: "smooth" })} color="#ffffff" strokeWidth={3} size={20}/>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allData.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center">
                                    <img src={`https://ecommerce-api-3bc3.onrender.com${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">ID: {product.id}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-700" > <span className={product.quantity > 0 ?"":"border-1 text-red-500 text-xs px-3 py-1 rounded-2xl"}>{product.quantity > 0 ? `${product.quantity || 0} units` :"Out Of Stock"} </span></td>
                                <td className="p-4 font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                                <td className="p-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEditProduct(product.id)} className="text-blue-500 hover:text-blue-700 transition-colors">
                                            <Edit size={20} />
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* -------------------------------------------------------- form used for adding a new product ---------------------------------------------------------------- */}

         {formchange && <div onClick={()=>setFormChange(false)} className="flex items-center justify-center w-full h-full fixed top-0 "> 
            <div className="absolute rounded-xl z-999999 shipping bg-white ">

            {submissionStatus==='finished'? (
                <div className="flex flex-col items-center justify-center text-center p-10">
                  <Lottie animationData={prroducts} loop={false} style={{ height: 150, width: 150 }} />
                    <h2 className="text-xl font-bold">{editProduct?"Products successfully edited!":"Product successfully added to the server!"}</h2>
                    <p className="text-green-500">Success</p>
                </div>
                ):(
                <form onSubmit={handleAddProduct}>
                <div onClick={(e)=> e.stopPropagation()} className="flex flex-col gap-2 adding-product w-full p-10 gap-5"> 
                <p className="text-center font-bold text-xl uppercase">{editProduct?"Edit Product ":"Add new product"}</p>
                <input value={value.name} onChange={(e)=>dispatch({type:"PRODUCT_NAME",payload:e.target.value})} type="text" className="p-3 capitalize" placeholder="Enter product name" required autoFocus  autoComplete="true"/>
                <input value={value.team} onChange={(e)=>dispatch({type:"PRODUCT_TEAM",payload:e.target.value})} type="text" className="p-3 capitalize" placeholder="Enter team name"  required  autoComplete="true"/>


                <select value={value.league} onChange={(e)=>dispatch({type:"PRODUCT_LEAGUE",payload:e.target.value})} name="" id="" className='p-3 appearance-none'>
                 <option value="" disabled selected hidden>Choose League</option>
                 <option value="Laliga">Laliga</option>
                 <option value="Premier League">Premier League</option>
                 <option  value="International">International</option>
                <option value="Serie A">Serie A</option>
                <option value="Bundesliga">Bundesliga</option>
                 </select>


                <div className="flex gap-2">
                <input value={value.season} onChange={(e)=>dispatch({type:"PRODUCT_SEASON",payload:Number(e.target.value)})} maxLength="4" type="text" className="p-3" placeholder="Season"   required autoComplete="true"/>
                <input value={value.quantity} onChange={(e)=>dispatch({type:"PRODUCT_QUANTITY",payload:Number(e.target.value)})} type="number" min="0" className="p-3" placeholder="Quantity" required  autoComplete="true"/>
                <input value={value.price} onChange={(e)=>dispatch({type:"PRODUCT_PRICE",payload:Number(e.target.value)})} type="text" className="p-3" placeholder="Price" required autoComplete="true"/>
                 </div>

                <input value={value.image} onChange={(e)=>dispatch({type:"PRODUCT_IMAGE",payload:e.target.value})} type="text" className="p-3" placeholder="Enter image link" required  autoComplete="true"/>

                <textarea value={value.description} onChange={(e)=>dispatch({type:"PRODUCT_DESCRIPTION",payload:e.target.value})} type="text" className="p-3 capitalize" rows="3" placeholder="Product description"  required autoComplete="true"/>
                <button type="submit" className="bg-black text-white uppercase font-bold rounded-xl py-2  hover:cursor-pointer hover:bg-[#1b1c1c] ">{submissionStatus==="submitting"?"Submitting...":"Submit"}</button>
                </div>
            </form>)}
            </div>
            </div>}
          
        {/* -------------------------------------------------------- form used for adding a new product ---------------------------------------------------------------- */}
            
             </>
    );
}

export default ProductManagementPage;   