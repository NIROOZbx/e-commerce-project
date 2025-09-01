import RegisterComponent from "../../components/auth/RegisterComponent"
import '/src/styles/registrationpage.css'
import loginPageImage from '../../assets/registerpage.webp';

function RegistrationPage(){ 

    return( 
        <> 
        <div className="flex h-screen justify-center items-center mx-4"> 
             <div className="flex justify-center items-stretch gap-10 container2 p-6 rounded-xl w-4xl">
                  
                   <div className="w-1/2">
                    <RegisterComponent/>
                </div>
                     
                      <div className="flex items-center justify-center w-1/2 relative ">
                        <img className="w-full h-full object-cover rounded-xl absolute" src={loginPageImage} alt="" />
                      </div>
              </div>
         </div>
        </>
    )

}

export default RegistrationPage