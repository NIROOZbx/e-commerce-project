import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "/src/styles/prodDetails.css";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer";
import { Send, Star, User, User2 } from "lucide-react";
import { api, jsonApi } from "../../api/api";
import loader from '../../loading.json'
import Lottie from "lottie-react";
import FakeStars from "../../components/FakeStar";
import useWishlist from "../../custom hook/useWishlist";
import useCartActions from "../../custom hook/useCart";

function ProductDetailsPage() {
    const { id } = useParams();
    const [prod, setProd] = useState(null);

    const [reviewData, setReviewData] = useState("");
    const [getReviewData, setGetReviewData] = useState([]);
   
    const [fakeRating] = useState(Math.floor(Math.random() * 5) + 1)
    const { handleWishClick, isWishlisted } = useWishlist()
    const [loading, setLoading] = useState(false)
    const { isInCart, handleCartClick } = useCartActions()



    useEffect(() => {
        setLoading(true)
        async function fetchProduct() {

            setTimeout(async () => {
                try {
                    console.log("in product details page", id);
                    const { data } = await api.get(`/public/products/${id}`);
                    setProd(data);


                } catch (err) {
                    console.log("Error fetching product", err);

                }
                setLoading(false);

            }, 1000);


        }

        fetchProduct();
    }, [id]);




    const fetchReviews = async () => {

        try {
            const { data } = await api.get(`/public/${id}/reviews`)

            setGetReviewData(data.reviews)
        } catch (e) {
            console.log("An error in fetching the reviews", e);

        }

    }

    useEffect(() => {
        fetchReviews()

    }, [])


  

    console.log("Review data", reviewData);




    if (loading || !prod) {
        return (
            <> 
            <Navbar/>
            <div className="flex justify-center items-center h-screen">
                <Lottie animationData={loader} loop />
            </div>
            </>
        );
    }



    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 py-10 mt-20 items-start " >
                {/* Left Section - Image */}
                <div className="flex justify-center items-center rounded-2xl " >
                    <img
                        className="w-full max-w-[500px] h-auto object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
                        src={prod.image}
                        alt={prod.name}
                    />
                </div>

                {/* Right Section - Product Details */}
                <div className="flex flex-col gap-6 mt-5 md:mt-0" >
                    <p className="text-2xl md:text-3xl font-bold"  >{prod.name}</p>
                    <p className="text-base md:text-lg"  >{prod.description}</p>
                    <p className="text-lg md:text-xl font-bold"  >
                        {prod.currency} {prod.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2"  >
                        <FakeStars rating={fakeRating} />
                        <p className="font-bold ">{fakeRating}/5</p>
                    </div>

                    {/* Sizes */}
                    <div className="flex flex-wrap gap-3"  >
                        {["S", "M", "L", "XL"].map((size) => (
                            <span
                                key={size}
                                className="border-2 border-solid px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                            >
                                {size}
                            </span>
                        ))}
                    </div>

                    {/* Stock */}
                    <p
                        className={`bg-gray-100 px-4 py-2 rounded-4xl w-fit  inline-block  ${prod.stock > 0 ? prod.stock < 5?"bg-red-100 text-red-600 font-bold": "bg-green-100 text-green-500 font-bold " :"bg-red-100 text-red-500 font-bold" }`}>
                        {prod.stock > 0
                            ? prod.stock < 5
                                ? `⚠️ Low stock, only ${prod.stock} available`
                                : "IN STOCK"
                            : "OUT OF STOCK"
                        }

                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            style={
                                isInCart(prod.id)
                                    ? { backgroundColor: "white", color: "black" }
                                    : { backgroundColor: "black", color: "white" }
                            }
                            onClick={() => handleCartClick(prod)}
                            disabled={prod.stock <= 0}
                            className="btn bg-black text-white rounded-3xl py-2 px-6 font-bold w-full sm:w-1/2 hover:cursor-pointer"
                        >
                            {prod.stock > 0
                                ? isInCart(prod.id)
                                    ? "GO TO CART"
                                    : "ADD TO CART"
                                : "OUT OF STOCK"}
                        </button>

                        <button
                            style={
                                prod.stock > 0
                                    ? isWishlisted(prod.id)
                                        ? { backgroundColor: "white", color: "black" }
                                        : { backgroundColor: "black", color: "white" }
                                    : { display: "none" }
                            }
                            onClick={(e) => { handleWishClick(e, prod) }}
                            className="btn bg-black text-white rounded-3xl py-2 px-6 font-bold w-full sm:w-1/2  hover:cursor-pointer"
                        >
                            {isWishlisted(prod.id) ? "GO TO WISHLIST" : "ADD TO WISHLIST"}
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className={`flex mx-10 gap-2 ${getReviewData?.length > 0 ? `block` : `hidden`}`}>
                <p className=" text-xl font-bold">Customer Reviews</p>
            </div>

            {getReviewData?.map((rev, idx) => (
                <div key={idx} className="mx-10 mt-4 px-5  box rounded-xl py-3">

                    <div className="flex items-center gap-2">
                        <img
                            src={rev.user_image}
                            alt="user"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="font-bold">{rev.user_name}</p>
                    </div>

                    <p className="py-2 capitalize">{rev.comment}</p>

                    <small className="text-gray-500 py-2">
                        {new Date(rev.created_at).toLocaleString()}
                    </small>
                </div>
            ))}


            <Footer />
        </>
    );
}

export default ProductDetailsPage;
