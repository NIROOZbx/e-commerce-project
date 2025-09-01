import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthenticationContext";
import api from "../api/api";

export const CartContext=createContext(null)

export function CartDetails({children}){
    const {currentUserData}=useContext(AuthContext)
    const [cart,setCart]=useState([])

   
    async function fetchCart() {
        try{ 
        const {data:res}=await api.get(`/users/${currentUserData.id}`)
        setCart(res.cart)
        }catch(e){
            console.log("There has been an error in your fetching")
        }
    }

    useEffect(()=>{
        fetchCart()
    },[currentUserData])


    async function addToCartInDatabase(product) {

        const {data:res}=await api.get(`/users/${currentUserData.id}`)

        const duplicateProducts=res.cart.find((items)=>items.id===product.id)
        
        console.log(duplicateProducts)


        if(duplicateProducts){ 
            setCart(res.cart)
            return
        }
        else{ 
        const updatedCart = [...res.cart, product];
        setCart(updatedCart);

    await api.patch(`/users/${currentUserData.id}`, { cart: updatedCart});

    }
  }


  async function removeFromCart(productId) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    await api.patch(`/users/${currentUserData.id}`, {
      cart: updatedCart,
    });
  }

   const increaseQuantity = (productId) => {
    setCart(currentCart =>
      currentCart.map(product =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
    console.log(`Increased quantity for product ${productId}`);
  };

  const decreaseQuantity = (productId) => {
    setCart(currentCart =>
      currentCart.map(product =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
     console.log(`Decreased quantity for product ${productId}`);
  };


    return(
        <CartContext.Provider value={{cart,setCart,addToCartInDatabase,removeFromCart,fetchCart,increaseQuantity,decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    )

}
