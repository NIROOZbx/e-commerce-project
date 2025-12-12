
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthenticationContext"
import { api } from "../api/api";
import { toast } from "react-toastify";




export const WishContext = createContext(null)

function WishList({ children }) {

    const [wishListed, setWishListed] = useState([])
    const { user ,role} = useContext(AuthContext)




    async function fetchWishlist() {
        try {
            const { data } = await api.get("/api/wishlist/")
            setWishListed(data)

            console.log("in wishlist", data);

        } catch (e) {
            console.log(e);

            console.log("There has been an error in your fetching")
        }
    }

    useEffect(() => {
        if (role=="user") {
            fetchWishlist();
        };
        
    }, [user]);


    async function wishlistedProduct(product) {

        console.log("In adding wishlist",product);

        try {
            const { data } = await api.post("/api/wishlist/",{"product_id": product.id });
            setWishListed((prev) => [...prev, product])

             return true; 

        } catch (err) {
            if (err.response?.status === 409) {
                toast.error("Already in wishlist");
                return;
            }

            toast.error("Something went wrong");
            
        
        console.log("Error adding wishlist:", err);
        return false;
    }
}
async function removeFromWishlist(productId) {
    console.log(productId)
    const updatedCart = wishListed.filter((item) => item.id !== productId);
    setWishListed(updatedCart);

    await api.delete(`/api/wishlist/${productId}`, {
        wishlist: updatedCart,
    });
}

return (
    <>
        <WishContext.Provider value={{ wishListed, setWishListed, removeFromWishlist, wishlistedProduct }}>
            {children}
        </WishContext.Provider>
    </>
)

}

export default WishList