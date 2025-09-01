import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthenticationContext"
import api from "../api/api"



export const WishContext=createContext(null)

function WishList({children}){

    const [wishListed,setWishListed]=useState([])
    const{currentUserData}=useContext(AuthContext)



    async function fetchWishlist() {
        try{ 
        const {data:res}=await api.get(`/users/${currentUserData.id}`)
        setWishListed(res.wishlist)
        }catch(e){
            console.log("There has been an error in your fetching")
        }
    }

    useEffect(()=>{
        fetchWishlist()
    },[currentUserData])



    async function wishlistedProduct(product){
        
        const {data:res}=await api.get(`/users/${currentUserData.id}`)

        const duplicateProducts=res.wishlist.find((items)=>items.id===product.id)
        

        if(duplicateProducts){ 
            setWishListed(res.wishlist)
            return
        }
        else{ 
        const updatedCart = [...res.wishlist, product];
        setWishListed(updatedCart);

    await api.patch(`/users/${currentUserData.id}`, { wishlist: updatedCart});

    }

    }

   async function removeFromWishlist(productId) {
    const updatedCart = wishListed.filter((item) => item.id !== productId);
    setWishListed(updatedCart);

    await api.patch(`/users/${currentUserData.id}`, {
      wishlist: updatedCart,
    });
  }

    return (
        <> 
        <WishContext.Provider value={{wishlistedProduct,wishListed,removeFromWishlist,setWishListed}}>
            {children}
        </WishContext.Provider>
        </>
    )

}

export default WishList