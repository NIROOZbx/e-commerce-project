import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthenticationContext";
import { api, jsonApi } from "../api/api";
import { toast } from "react-toastify";

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

            console.log("Order price in the context",orderPrice);
            
            
        } catch (e) {
            console.log("There has been an error in your fetching")
        }
    }


    useEffect(() => {
        if (role=="user") {
         fetchCart()
         
        }
       
    }, [])


    async function addToCartInDatabase(product) {

        console.log("After post request",cart);

        try {
            await api.post(`/api/cart/`, { "product_id": product.id })
            setCart(prev=>[product,...prev])
             await fetchCart();
            
        } catch (err) {
            console.log(err);
        }
    }


    async function removeFromCart(productId) {
        console.log(typeof (productId));

        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);

        await api.delete(`api/cart/${productId}`, { cart: updatedCart, });

    }


    async function UpdateQuantity(productID, quantity) {

        console.log("Quantity inside the cart page", quantity);
        try {
            
            
            let {data}= await api.patch("/api/cart/", { "product_id": productID, "quantity": quantity })
            
            setCart(prevCart => prevCart.map((item) => item.id === productID ? { ...item, quantity:quantity } :
                item))

        } catch (err) {

            console.log("error in context of cart",err);
            

            toast.warning(err.response?.data?.error)

        }

    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCartInDatabase, removeFromCart, fetchCart, UpdateQuantity ,orderPrice}}>
            {children}
        </CartContext.Provider>
    )

}
