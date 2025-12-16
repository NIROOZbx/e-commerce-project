
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthenticationContext"
import { api } from "../api/api";
import { toast } from "sonner";




export const WishContext = createContext(null)

function WishList({ children }) {

    const [wishListed, setWishListed] = useState([])
    const { user ,role} = useContext(AuthContext)




    async function fetchWishlist() {
        try {
            const { data } = await api.get("/api/wishlist/")
            setWishListed(data)

            

        } catch (e) {
          
        }
    }

    useEffect(() => {
        if (role=="user") {
            fetchWishlist();
        };
        
    }, [user]);


    async function wishlistedProduct(product) {


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
            
        
     
        return false;
    }
}
async function removeFromWishlist(productId) {
   
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