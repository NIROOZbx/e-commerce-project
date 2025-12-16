import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthenticationContext";
import { api, jsonApi } from "../api/api";
import { toast } from "sonner";

export const CartContext = createContext(null)

export function CartDetails({ children }) {
    const { user,role } = useContext(AuthContext)
    const [cart, setCart] = useState([])
    const orderPrice=useRef(null)


    async function fetchCart() {
        try {
            const { data } = await api.get(`/api/cart/`)
            setCart(data.items)
            orderPrice.current= data.total_price

          
            
            
        } catch (e) {
           
        }
    }


    useEffect(() => {
        if (role=="user") {
         fetchCart()
         
        }
       
    }, [])


    async function addToCartInDatabase(product) {

       

        try {
            await api.post(`/api/cart/`, { "product_id": product.id })
            setCart(prev=>[product,...prev])
             await fetchCart();
            
        } catch (err) {
            
        }
    }


    async function removeFromCart(productId) {
      

        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);

        await api.delete(`api/cart/${productId}`, { cart: updatedCart, });

    }


    async function UpdateQuantity(productID, quantity) {

     
        try {
            
            
            let {data}= await api.patch("/api/cart/", { "product_id": productID, "quantity": quantity })
            
            setCart(prevCart => prevCart.map((item) => item.id === productID ? { ...item, quantity:quantity } :
                item))

        } catch (err) {

            
            toast.warning(err.response?.data?.error)

        }

    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCartInDatabase, removeFromCart, fetchCart, UpdateQuantity ,orderPrice}}>
            {children}
        </CartContext.Provider>
    )

}
