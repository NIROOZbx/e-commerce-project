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
import SearchData from "./context/SearchContext";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSucessPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/AboutPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./Admin-Section/pages/Dashboard";
import AdminLayout from "./Admin-Section/pages/Layouts/AdminLayout";
import UserManagementPage from "./Admin-Section/pages/UserManagementPage";
import AllOrdersPage from "./Admin-Section/pages/AllOrdersPage";
import ProductManagementPage from "./Admin-Section/pages/ProductMangementPage";


function App() {
 

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

      <Route path="/cart" element={<ProtectedRoute>   <CartPage />  </ProtectedRoute>} />

      <Route path="/wishlist" element={ <ProtectedRoute> <WishListPage /> </ProtectedRoute> }/>

      <Route path="*" element={<ErrorPage />} />

      <Route path="/checkout" element={<CheckOutPage />} />

      <Route path="/order" element={<OrdersPage/>}/>

      <Route path="/ordersuccess" element={<OrderSuccessPage/>}/>
      
      <Route path="/admin" element={  <ProtectedRoute> <AdminLayout/> </ProtectedRoute>}> 

      <Route index element={<Dashboard/>}/>

      <Route path="users" element={<UserManagementPage/>}/>

      <Route path="ordermanagement" element={<AllOrdersPage/>}/>

      <Route path="productmanagement" element={<ProductManagementPage/>}/>

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
