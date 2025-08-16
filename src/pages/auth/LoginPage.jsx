import LoginComponent from "../../components/auth/LoginComponent"; 
import { NavLink } from "react-router-dom";
import '/src/styles/loginpage.css'

function LoginPage(){

return( 
    <> 
      <div className="flex h-screen justify-center items-center"> 
             <div className="flex justify-center items-stretch gap-10 container2 p-6 rounded-xl w-4xl">
                 
                   <div className="w-1/2">
                    <LoginComponent/>
                </div>
                     
                      <div className="flex items-center justify-center w-1/2 relative ">
                        <img className="w-full h-full object-cover rounded-xl absolute" src="src/assets/registerpage.webp" alt="" />
                      </div>
              </div>
         </div>
    
    
    </>
)

}

export default LoginPage