import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useCartActions() {
    const { user } = useContext(AuthContext);
    const { cart, addToCartInDatabase } = useContext(CartContext);
    const navigate = useNavigate();

    const isInCart = (id) => cart.some((item) => item.id === id);

    const handleCartClick = async (product) => {
        
        if (!user) {
            toast.warning("Please login first");
            navigate("/login");
            return;
        }

        if (isInCart(product.id)) {
            navigate("/cart");
            return;
        }
        
        try {
            await addToCartInDatabase(product);
            toast.success("Successfully added to cart");
        } catch (err) {
            toast.error("Failed to add item. Try again.");
        }
    };

    console.log("new cart from cart hook",cart);
    

    return { handleCartClick, isInCart };
}
