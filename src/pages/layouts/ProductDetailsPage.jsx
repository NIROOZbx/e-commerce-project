import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthenticationContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "/src/styles/prodDetails.css";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer";
import { WishContext } from "../../context/WishContext";
import { toast } from "react-toastify";

function ProductDetailsPage() {
  const { id } = useParams();
  const { products, currentUserData } = useContext(AuthContext);
  const [prod, setProd] = useState(null);
  const { cart, setCart, addToCartInDatabase } = useContext(CartContext);
  const { wishlistedProduct, wishListed } = useContext(WishContext);
  const navigate = useNavigate();

  useEffect(() => {
    const productData = products.find((product) => product.id === id);
    if (productData) {
      setProd(productData);
    }
  }, [id, products]);

  if (!prod) {
    return <h1>Loading</h1>;
  }
  const isInCart = cart.some((item) => item.id === prod.id);
  const isInWishlist = wishListed.some((item) => item.id === prod.id);

  function addToCart() {
    if (currentUserData) {
      if (prod.quantity > 0) {
        setCart([prod, ...cart]);
        addToCartInDatabase(prod);
        navigate('/cart')
      }
    } else {
      toast.warning("Must login");
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 py-10 mt-20 ">
        {/* Left Section - Image */}
        <div className="flex justify-center items-center product rounded-2xl product">
          <img
            className="w-full max-w-[500px] h-auto object-contain rounded-2xl"
            src={`https://ecommerce-api-3bc3.onrender.com${prod.image}`}
            alt={prod.name}
          />
        </div>

        {/* Right Section - Product Details */}
        <div className="flex flex-col gap-6 mt-5 md:mt-0">
          <p className="text-2xl md:text-3xl font-bold">{prod.name}</p>
          <p className="text-base md:text-lg">{prod.description}</p>
          <p className="text-lg md:text-xl font-bold">
            {prod.currency} {prod.price.toFixed(2)}
          </p>

          {/* Sizes */}
          <div className="flex flex-wrap gap-3">
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
            <button
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

            <button
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
