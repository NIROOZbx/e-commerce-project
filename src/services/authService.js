import axios from 'axios'

export async function registerData(registerCredentials) {
    try{ 
    const regData={
        name:registerCredentials.name,
        email:registerCredentials.email,
        password:registerCredentials.password,
        cart:[],
        wishlist:[],
        orders:[]
    }

    const {data:users}=await axios.get("http://localhost:5000/users")

     const userExists=users.some((users)=> users.name==regData.name)
    const emailExists=users.some((users)=> users.email==regData.email)
   if(userExists||emailExists){ 

   }else{
    const res=await axios.post("http://localhost:5000/users",regData)
     const actualData= res.data;
      }
     return {userExists,emailExists}
    }catch(e){
        console.log("error",e)
    }
}

export async function loginData(loginCredentials) {

    const {data:res}=await axios.get("http://localhost:5000/users")
    
    const userInDatabase=res.find((user)=>user.email===loginCredentials.email && user.password === loginCredentials.password)

    return {userInDatabase}
    
}