import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "/src/styles/prodDetails.css";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer";
import { WishContext } from "../../context/WishContext";
import { toast } from "react-toastify";
import { Send, Star, User, User2 } from "lucide-react";
import api from "../../api/api";
import loader from '../../loading.json'
import Lottie from "lottie-react";
import FakeStars from "../../components/FakeStar";

function ProductDetailsPage() {
  const { id } = useParams();
  const { products, currentUserData } = useContext(AuthContext);
  const [prod, setProd] = useState(null);
  const { cart, setCart, addToCartInDatabase } = useContext(CartContext);
  const { wishlistedProduct, wishListed } = useContext(WishContext);
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState("");
  const [getReviewData, setGetReviewData] = useState([]);
  const [reviewError, setReviewError] = useState(false);
  const [fakeRating]=useState(Math.floor(Math.random()*5)+1)

 const deliveryStatus = currentUserData?.order?.some((order) =>
  order.delivery === "Delivered" &&
  order.products.some((item) => String(item.id) === String(id))
);

  console.log(deliveryStatus);
  



useEffect(()=>{

  const fetchReviews=async()=>{

    try{

      let {data:reviews}=await api.get(`/products/${id}`)

      setGetReviewData(reviews.reviews||[])
    }catch(e){
      console.log("An error in fetching the reviews");
      
    }

  }
  fetchReviews()

},[id])

  const handleSubmitReview = async () => {
    if (deliveryStatus) {
      const newReview = {
        user: currentUserData?.name,
        review: reviewData,
        date: new Date().toISOString(),
      };

      const updatedReview = [newReview, ...getReviewData];

      setGetReviewData(updatedReview);
      try {
        console.log("Adding review to database");
        let {data:res}=await api.patch(`/products/${parseInt(id)}`, {reviews: updatedReview});
        console.log("Review added successfully!",res);
      } catch (e) {
        console.log("Error in updating db with reviews", e);
      }
    } else {
      setReviewError(true);
    }

    setReviewData("");
  };

  useEffect(() => {
    const productData = products.find((product) => product.id === id);
    if (productData) {
      setProd(productData);
    }
  }, [id, products]);

  if (!prod) {
    return <div className="flex justify-center items-center h-screen">
            <Lottie animationData={loader} loop={true} />
          </div>
  }
  const isInCart = cart.some((item) => item.id === prod.id);
  const isInWishlist = wishListed.some((item) => item.id === prod.id);

  function addToCart() {
    if (currentUserData) {
      if (prod.quantity > 0) {
        setCart([prod, ...cart]);
        addToCartInDatabase(prod);
        navigate("/cart");
      }
    } else {
      toast.warning("Must login");
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 py-10 mt-20 items-start ">
        {/* Left Section - Image */}
        <div className="flex justify-center items-center rounded-2xl " data-aos="fade-up">
          <img
            className="w-full max-w-[500px] h-auto object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
            src={`https://ecommerce-api-3bc3.onrender.com${prod.image}`}
            alt={prod.name}
          />
        </div>

        {/* Right Section - Product Details */}
        <div className="flex flex-col gap-6 mt-5 md:mt-0" data-aos="fade-up">
          <p className="text-2xl md:text-3xl font-bold"  data-aos="fade-up">{prod.name}</p>
          <p className="text-base md:text-lg"  data-aos="fade-up">{prod.description}</p>
          <p className="text-lg md:text-xl font-bold"  data-aos="fade-up">
            {prod.currency} {prod.price.toFixed(2)}
          </p>
          <div className="flex gap-2"  data-aos="fade-up">
          <FakeStars rating={fakeRating}/>
          <p className="font-bold ">{fakeRating}/5</p>
           </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-3"  data-aos="fade-up">
            {["S", "M", "L", "XL"].map((size) => (
              <span  data-aos="fade-up"
                key={size}
                className="border-2 border-solid px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
              >
                {size}
              </span>
            ))}
          </div>

          {/* Stock */}
          <p  data-aos="fade-up"
            className={
              prod.quantity > 0
                ? "text-green-500 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {prod.quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button  data-aos="fade-up"
              style={
                isInCart
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "black", color: "white" }
              }
              onClick={addToCart}
              disabled={prod.quantity <= 0}
              className="btn bg-black text-white rounded-3xl py-2 px-6 font-bold w-full sm:w-1/2 hover:cursor-pointer"
            >
              {prod.quantity > 0
                ? isInCart
                  ? "GO TO CART"
                  : "ADD TO CART"
                : "OUT OF STOCK"}
            </button>

            <button  data-aos="fade-up"
              style={
                prod.quantity > 0
                  ? isInWishlist
                    ? { backgroundColor: "white", color: "black" }
                    : { backgroundColor: "black", color: "white" }
                  : { display: "none" }
              }
              onClick={() => {
                wishlistedProduct(prod);
                if (isInWishlist) {
                  navigate("/wishlist");
                } else if (currentUserData) {
                  wishlistedProduct(prod);
                  toast.success("Added product to wishlist");
                } else {
                  toast.error("Must login");
                  navigate("/login");
                }
              }}
              className="btn bg-black text-white rounded-3xl py-2 px-6 font-bold w-full sm:w-1/2  hover:cursor-pointer"
            >
              {isInWishlist ? "GO TO WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
          <textarea  data-aos="fade-up"
            placeholder="Leave a review"
            value={reviewData}
            onChange={(e) => setReviewData(e.target.value)}
            name=""
            id=""
            cols="20"
            rows="5"
            className="shadow-xl p-5 rounded-xl review"
          ></textarea>
          <div className="flex flex-col justify-center items-center gap-4">
            {reviewError && (
              <p  data-aos="fade-up" className="text-red-500  text-center font-bold">
                Order the product to leave a review
              </p>
            )}
            <button 
              onClick={handleSubmitReview}
              className="border-1 py-1 px-8 rounded-md bg-black text-white uppercase font-semibold flex gap-3 items-center"
            >
              Submit <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className={`flex mx-10 gap-2 ${ getReviewData.length > 0?`block`:`hidden`}`}>
        <p className=" text-xl font-bold">Customer Reviews</p>
      </div>

      
  {getReviewData.map((rev, idx) => (
    <div key={idx} className="mx-10 mt-4 p-2 box rounded-xl py-3">

    <div className="flex gap-1"> 
      <User2 size={20}/>
      <p className="font-bold">{rev.user}</p>
      </div>
      <p className="py-2 capitalize">{rev.review}</p>
      <small className="text-gray-500 py-2">{new Date(rev.date).toLocaleString()}</small>
    </div>
  ))}


      <Footer />
    </>
  );
}

export default ProductDetailsPage;
