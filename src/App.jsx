import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/layouts/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import { UserAuthentication } from "./context/AuthenticationContext";
import ProductsPage from "./pages/layouts/ProductsPage";



function App() {

  return( 

    <BrowserRouter>

    <UserAuthentication> 

    <Routes>

    <Route path='/' element={<HomePage/>}/>

    <Route path='/register' element={<RegistrationPage/>}/>
    
    <Route path='/login' element={<LoginPage/>}/>

    <Route path='/products' element={<ProductsPage/>}/>
    
    </Routes>

  </UserAuthentication> 

  </BrowserRouter>
  )
}
export default App;
