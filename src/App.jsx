import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/layouts/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import { UserAuthentication } from "./context/AuthenticationContext";
import ProductsPage from "./pages/layouts/ProductsPage";
import ProductDetailsPage from "./pages/layouts/ProductDetailsPage";
import { CartDetails } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import Wishlist from "./context/WishContext";
import WishListPage from "./pages/layouts/WishlistPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./components/PublicRoute";
import ErrorPage from "./pages/ErrorPage";
import OrderProducts from "./context/OrderContext";
import { useEffect } from "react";
import SearchData from "./context/SearchContext";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSucessPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/AboutPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  }, [location.pathname]);

  return (
    
      <UserAuthentication>

      <CartDetails>

      <Wishlist>

      <OrderProducts>

      <SearchData> 
      
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
      
      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={ <PublicRoute> <RegistrationPage /> </PublicRoute>} />

      <Route path="/login" element={ <PublicRoute> <LoginPage /></PublicRoute> }/>

      <Route path="/products" element={<ProductsPage />} />

      <Route path='/contact' element={<ContactPage/>}/>

      <Route path='/about' element={<AboutPage/>}/>

      <Route path="/products/:id" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<ProtectedRoute>  <CartPage />  </ProtectedRoute>} />

      <Route path="/wishlist" element={ <ProtectedRoute> <WishListPage /> </ProtectedRoute> }/>

      <Route path="*" element={<ErrorPage />} />

      <Route path="/checkout" element={<CheckOutPage />} />

      <Route path="/order" element={<OrdersPage/>}/>

      <Route path="/ordersuccess" element={<OrderSuccessPage/>}/>

      </Routes>

      </SearchData>     

      </OrderProducts>

      </Wishlist>

      </CartDetails>

      </UserAuthentication>
   
  );
}
export default App;
