import RegisterComponent from "../../components/auth/RegisterComponent"
import '/src/styles/registrationpage.css'
import loginPageImage from '../../assets/registerpage.webp';

function RegistrationPage(){ 

    return( 
        <> 
        <div className="flex min-h-screen items-center justify-center mx-4"> 
             <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl container2">
                  
                   <div className="w-full p-6 sm:p-8 lg:w-1/2">
                    <RegisterComponent/>
                </div>
                     
                      <div className="flex items-center justify-center w-1/2 relative hidden sm:block ">
                        <img className="w-full h-full object-cover  absolute" src={loginPageImage} alt="" />
                      </div>
              </div>
         </div>
        </>
    )

}

export default RegistrationPage