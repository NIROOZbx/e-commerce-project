import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { WishContext } from "../context/WishContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



export default function useWishlist() {

    const { user } = useContext(AuthContext)
    const { wishListed, wishlistedProduct } = useContext(WishContext);
    const navigate = useNavigate();


    const handleWishClick = async (e, product) => {

        e.stopPropagation()

        if (!user) {
            navigate("/login");
            toast.error("Must login");
            return
        }

        const isInWishlist = wishListed?.some((item) => item.id === product.id)

        if (isInWishlist) {
            navigate("/wishlist"); 
        } else {
            const success = await wishlistedProduct(product);
            if (success) toast.success("Added to wishlist");
        }

    }
    const isWishlisted = (id) => wishListed.some(item => item.id === id);

     return { handleWishClick, isWishlisted };



}