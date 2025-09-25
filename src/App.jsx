import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/layouts/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";

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
import SearchData from "./context/SearchContext";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSucessPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./Admin-Section/pages/Dashboard";
import AdminLayout from "./Admin-Section/pages/Layouts/AdminLayout";
import UserManagementPage from "./Admin-Section/pages/UserManagementPage";
import AllOrdersPage from "./Admin-Section/pages/AllOrdersPage";
import ProductManagementPage from "./Admin-Section/pages/ProductMangementPage";
import ProductsPage from './pages/layouts/ProductsPage'
import { UserAuthentication } from "./context/AuthenticationContext";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./Admin-Section/pages/Notification";
import NotificatonPage from "./pages/NotificationPage";
import { useEffect } from "react";
import  AOS  from "aos";
import "aos/dist/aos.css";


function App() {

    useEffect(() => {
    AOS.init({ duration: 1000 }); // animation lasts 1s
  }, []);
 

  return (
    
      <UserAuthentication>

      <CartDetails>

      <Wishlist>

      <OrderProducts>

      <SearchData> 

      <ToastContainer position="top-center"
         autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
            rtl={false}
        
        draggable
    />

      <Routes>
      
      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={ <PublicRoute> <RegistrationPage /> </PublicRoute>} />

      <Route path="/login" element={ <PublicRoute> <LoginPage /></PublicRoute> }/>

      <Route path="/products" element={<ProductsPage />} />

      <Route path='/profile' element={<ProtectedRoute requiredRole="user"><ProfilePage/></ProtectedRoute>}/>

      <Route path='/contact' element={<ContactPage/>}/>

      <Route path='/about' element={<AboutPage/>}/>

      <Route path="/products/:id" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<ProtectedRoute requiredRole="user">   <CartPage />  </ProtectedRoute>} />

      <Route path="/notifications" element={<ProtectedRoute requiredRole="user">   <NotificatonPage />  </ProtectedRoute>} />

      <Route path="/wishlist" element={ <ProtectedRoute requiredRole="user"> <WishListPage /> </ProtectedRoute> }/>

      <Route path="*" element={<ErrorPage />} />

      <Route path="/checkout" element={<ProtectedRoute requiredRole="user"><CheckOutPage /> </ProtectedRoute>} />

      <Route path="/order" element={<ProtectedRoute requiredRole="user"><OrdersPage/></ProtectedRoute>}/>

      <Route path="/ordersuccess" element={<ProtectedRoute requiredRole="user"><OrderSuccessPage/></ProtectedRoute>}/>
      
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"> <AdminLayout/></ProtectedRoute>}>

      <Route index element={<Dashboard/>}/>

      <Route path="users" element={<UserManagementPage/>}/>

      <Route path="ordermanagement" element={<AllOrdersPage/>}/>

      <Route path="productmanagement" element={<ProductManagementPage/>}/>

      <Route path="notification" element={<Notification/>}/>

      </Route>

      </Routes>

      </SearchData>     

      </OrderProducts>

      </Wishlist>

      </CartDetails>

      </UserAuthentication>
   
  );
}
export default App;
