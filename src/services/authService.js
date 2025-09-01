import axios from 'axios'
import api from '../api/api'

export async function registerData(registerCredentials) {
    try{ 
    const regData={
        name:registerCredentials.name,
        email:registerCredentials.email,
        password:registerCredentials.password,
        isAuthenticated:true,
        cart:[],
        wishlist:[],
        order:[]
    }

    const {data:users}=await api.get("/users")

     const userExists=users.some((users)=> users.name==regData.name)
    const emailExists=users.some((users)=> users.email==regData.email)
   if(userExists||emailExists){ 

   }else{
    await api.post("/users",regData)
      }
     return {userExists,emailExists}
    }catch(e){
        console.log("error",e)
    }
}

export async function loginData(loginCredentials) {

    if(loginCredentials.email==="admin@gmail.com" && loginCredentials.password==="admin@123"){
        const {data:res}=await api.get("/admin")
        const adminInDb=res.find((admin)=>admin.email===loginCredentials.email && admin.password === loginCredentials.password)
        console.log(adminInDb)
        return {adminInDb}
    }else{
     const {data:res}=await api.get("/users")
    
    const userInDatabase=res.find((user)=>user.email===loginCredentials.email && user.password === loginCredentials.password)

    return {userInDatabase}

    }

    
    
}