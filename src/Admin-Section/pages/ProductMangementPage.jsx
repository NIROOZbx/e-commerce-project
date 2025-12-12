import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import { Edit, Trash2, PlusCircle, MoveUp, Search, PackageX, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import '/src/styles/prodmanagement.css'

import prroducts from '../../Product.json'
import Lottie from "lottie-react";
import { api } from "../../api/api";
import { Spinner } from "@/components/ui/spinner";


function getProductData(state, action) {

    switch (action.type) {
        case 'SET_FORM_DATA':
            return action.payload;

        case 'PRODUCT_NAME':
            return { ...state, name: action.payload }

        case 'PRODUCT_TEAM':
            return { ...state, team: action.payload }

        case 'PRODUCT_LEAGUE':
            return { ...state, league: action.payload }

        case 'PRODUCT_SEASON':
            return { ...state, season: action.payload }

        case 'PRODUCT_stock':
            return { ...state, stock: action.payload }

        case 'PRODUCT_PRICE':
            return { ...state, price: action.payload }

        case 'PRODUCT_IMAGE':
            return { ...state, image: action.payload }

        case 'PRODUCT_DESCRIPTION':
            return { ...state, description: action.payload }

        default:
            return state
    }

}

const initValue = {
    name: '',
    team: '',
    league: '',
    season: 0,
    stock: 0,
    price: 0,
    currency: "$",
    image: null,
    category: "Home",
    description: ''

}
function ProductManagementPage() {

    const [formchange, setFormChange] = useState(false)
    const { role } = useContext(AuthContext)
    const [editProduct, setEditProduct] = useState(null)
    const [value, dispatch] = useReducer(getProductData, initValue)
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState('')
    const [sortData, setSortData] = useState('')
    const [filterData, setFilterData] = useState('')
    const [products, Setproducts] = useState([])
    const [submissionStatus, setSubmissionStatus] = useState("idle")



    const [page, SetPage] = useState(1)

    const [getSearchData, setGetSearchData] = useState('')


    const ref = useRef({})

    function getSort(e) {
        setSortData(e.target.value)
    }

    function getFilter(e) {
        setFilterData(e.target.value)
    }


    async function getProducts() {
        try {
            const { data } = await api.get(`/public/products?page=${page}&limit=12&filter=${filterData}&sort_by=${sortData}&se=${getSearchData}`)
            ref.current = data
            Setproducts(data.data)

        } catch (err) {
            console.log(err);
        }

    }


    useEffect(() => {
        if (role == "admin") {
            getProducts()
        }
    }, [page, sortData, filterData, getSearchData])



    useEffect(() => {
        if (formchange) {
            if (editProduct) {
                dispatch({ type: 'SET_FORM_DATA', payload: editProduct })
            } else {
                dispatch({ type: 'SET_FORM_DATA', payload: initValue })
            }
        }

    }, [editProduct, formchange])


    useEffect(() => {
        if (submissionStatus === 'success') {
            const timer = setTimeout(() => {
                setFormChange(false);
                setEditProduct(null);
                setSubmissionStatus('idle');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [submissionStatus]);


    function handleNext() {

        SetPage((p) => p + 1)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    function handlePrev() {
        SetPage((p) => p - 1)
    }



    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmissionStatus("idle");

setTimeout(async() => {
     try {
            const formData = new FormData();
            formData.append("name", value.name);
            formData.append("team", value.team);
            formData.append("league", value.league);
            formData.append("season", value.season);
            formData.append("stock", value.stock);
            formData.append("price", value.price);
            formData.append("currency", value.currency);
            formData.append("category", value.category);
            formData.append("description", value.description);

            if (value.image instanceof File) {
                formData.append("image", value.image);
            }

            if (editProduct) {
                await api.patch(`/admin/products/${editProduct.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post(`/admin/products`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            getProducts()

            setSubmissionStatus("success");
            setLoading(false)

        } catch (err) {
            console.log(err);
            setSubmissionStatus("error");
        } finally {
            setLoading(false);
        }
    
}, 1500);

       
    };

    console.log("Error ",submissionStatus);
    

const handleEditProduct = (id) => {
    const product = allData.find((item) => item.id === id);

    setEditProduct(product);     // Set the product to edit
    dispatch({ type: "SET_ALL_FIELDS", payload: product });  // Pre-fill your form reducer
    setFormChange(true);         // Open the popup
};


    const handleDeleteProduct = async (productId) => {

        if (window.confirm(`Are you sure you want to delete the product`)) {
            await api.delete(`/admin/products/${productId}`)


          getProducts()
        }
    };

    let allData = products


    const outOfStock = products.filter(p => p.stock === 0).length

    return (
        <>
            <div className=" bg-gray-50 h-screen px-15">


                {/* Page Header */}
                <div className="flex justify-between items-center mb-8 relative">
                    <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-2 bg-white shadow-md rounded-full
                   border border-gray-200 text-gray-700
                   focus:outline-none focus:ring-0 focus:border-gray-200 
                   transition-all"
                        />

                        {/* Search Icon */}
                        <Search
                            size={20}
                            onClick={() => {
                                setGetSearchData(searchData);
                                setSearchData('');
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 
                   hover:text-black cursor-pointer transition"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setFormChange(true)
                            setEditProduct(null)
                        }}
                        className="flex items-center bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md  hover:bg-[#2f3030] transition-colors duration-300"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        Add New Product
                    </button>
                </div>
                <p className="mt-5 text-center uppercase font-bold ">{allData.length} Products</p>

                <div className='flex justify-center mt-5 gap-10'>
                    <select onChange={getSort} name="" id="" className='ml-2 border-1 rounded-xl p-1'>
                        <option value="" disabled selected hidden >Sort</option>
                        <option value="low" >Low - to - High</option>
                        <option value="high">High - to - Low</option>
                        <option value="Normal">Normal</option>
                        <option value="recent">Recently Added</option>
                        <option value="low-stock">Stock (Low → High)</option>
                        <option value="high-stock">Stock (High → Low)</option>
                    </select>

                    <select onChange={getFilter} name="" id="" className='ml-2 border-1 rounded-xl px-1'>
                        <option value="" disabled selected hidden>Filter</option>
                        <option value="laliga">Laliga</option>
                        <option value="premier">Premier League</option>
                        <option value="international">International</option>
                        <option value="serie">Serie A</option>
                        <option value="bundesliga">Bundesliga</option>
                        <option value="">Normal</option>
                    </select>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-6 mb-6 mt-6">
                    <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
                        <Package className="text-blue-500 w-10 h-10 mr-4" />
                        <div>
                            <p className="text-sm text-gray-500">Total Products</p>
                            <p className="text-2xl font-bold text-gray-800">{ref.current.totalCount}</p>
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
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500">ID: {product.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700" > <span className={product.stock > 0 ? "" : "border-1 text-red-500 text-xs px-3 py-1 rounded-2xl"}>{product.stock > 0 ? `${product.stock || 0} units` : "Out Of Stock"} </span></td>
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
                <div className='flex justify-center gap-3 pt-10 py-10 items-center' >
                    <button className={`border-1 p-1 bg-black text-white rounded-4xl ${ref.current.page == 1 ? "hidden" : "block"}`} onClick={handlePrev} ><ChevronLeft /></button>
                    <p className={`font-bold ${ref.current.page == 1 ? "hidden" : "block"}`}>{ref.current.page}</p>
                    <button className={`border-1 p-1 bg-black text-white rounded-4xl ${ref.current.page === ref.current.totalPages
                        ? "hidden" : "block"}`} onClick={handleNext}><ChevronRight /></button>
                </div>
            </div>

            {/* -------------------------------------------------------- form used for adding a new product ---------------------------------------------------------------- */}

            {formchange &&
                <div onClick={() => setFormChange(false)} className="flex items-center justify-center w-full h-full fixed top-0 ">
                    <div className="absolute rounded-xl z-999999 shipping bg-white ">

                        {submissionStatus == "success" ? (
                            <div className="flex flex-col items-center justify-center text-center p-10">
                                <Lottie animationData={prroducts} loop={false} style={{ height: 150, width: 150 }} />
                                <h2 className="text-xl font-bold">{editProduct ? "Products successfully edited!" : "Product successfully added !"}</h2>
                            </div>
                        ) : (
                            <form onSubmit={handleAddProduct}>
                                <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto">
                                    <div className="flex flex-col gap-3 px-6 adding-product overflow-y-auto">

                                        <p className="text-center font-bold text-xl uppercase">{editProduct ? "Edit Product " : "Add new product"}</p>

                                        <label className="font-semibold">Product Name</label>
                                        <input
                                            value={value.name}
                                            onChange={(e) => dispatch({ type: "PRODUCT_NAME", payload: e.target.value })}
                                            type="text"
                                            className="p-3 capitalize"
                                            placeholder="Enter product name"
                                            required
                                            autoFocus
                                            autoComplete="true"
                                        />

                                        <label className="font-semibold">Team Name</label>
                                        <input
                                            value={value.team}
                                            onChange={(e) => dispatch({ type: "PRODUCT_TEAM", payload: e.target.value })}
                                            type="text"
                                            className="p-3 capitalize"
                                            placeholder="Enter team name"
                                            required
                                            autoComplete="true"
                                        />

                                        <label className="font-semibold">League</label>
                                        <select
                                            value={value.league}
                                            onChange={(e) => dispatch({ type: "PRODUCT_LEAGUE", payload: e.target.value })}
                                            className="p-3 appearance-none"
                                        >
                                            <option value="" disabled hidden>Choose League</option>
                                            <option value="Laliga">Laliga</option>
                                            <option value="Premier League">Premier League</option>
                                            <option value="International">International</option>
                                            <option value="Serie A">Serie A</option>
                                            <option value="Bundesliga">Bundesliga</option>
                                        </select>

                                        <label className="font-medium ">Season / Stock / Price</label>
                                        <div className="flex gap-2">
                                            <input
                                                value={value.season}
                                                onChange={(e) => dispatch({ type: "PRODUCT_SEASON", payload: Number(e.target.value) })}
                                                maxLength="4"
                                                type="text"
                                                className="p-3"
                                                placeholder="Season"
                                                required
                                                autoComplete="true"
                                            />

                                            <input
                                                value={value.stock}
                                                onChange={(e) => dispatch({ type: "PRODUCT_stock", payload: Number(e.target.value) })}
                                                type="number"
                                                min="0"
                                                className="p-3"
                                                placeholder="Stock"
                                                required
                                                autoComplete="true"
                                            />

                                            <input
                                                value={value.price}
                                                onChange={(e) => dispatch({ type: "PRODUCT_PRICE", payload: Number(e.target.value) })}
                                                type="text"
                                                className="p-3"
                                                placeholder="Price"
                                                required
                                                autoComplete="true"
                                            />
                                        </div>

                                        <label className="font-semibold">Product Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                dispatch({
                                                    type: "PRODUCT_IMAGE",
                                                    payload: e.target.files[0]
                                                })
                                            }
                                            className="p-3"
                                            required={!editProduct}
                                        />

                                        {value.image instanceof File && (
                                            <img
                                                src={URL.createObjectURL(value.image)}
                                                alt="preview"
                                                className="w-32 h-32 rounded-md object-cover mt-3"
                                            />
                                        )}

                                        <label className="font-semibold">Description</label>
                                        <textarea
                                            value={value.description}
                                            onChange={(e) => dispatch({ type: "PRODUCT_DESCRIPTION", payload: e.target.value })}
                                            className="p-3 capitalize"
                                            rows="3"
                                            placeholder="Product description"
                                            required
                                            autoComplete="true"
                                        />

                                        <button type="submit" className="bg-black text-white uppercase font-bold rounded-xl py-2  hover:cursor-pointer hover:bg-[#1b1c1c] ">{loading ?<span className="flex gap-2 justify-center items-center text-gray-100">Submitting ... <Spinner  /></span> : "Submit"}</button>
                                    </div>
                                </div>
                            </form>)}
                    </div>

                </div>}



            {/* -------------------------------------------------------- form used for adding a new product ---------------------------------------------------------------- */}

        </>
    );
}

export default ProductManagementPage;   