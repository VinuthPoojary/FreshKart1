import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';

// 404 Page Component
const NotFound = () => (
  <div className="text-center py-20 text-xl text-red-500">Page Not Found</div>
);

// Sub-component to safely use `useLocation()`
function AppContent() {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster position="top-right" reverseOrder={false} />

      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Seller Login */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            {/* Nested Routes only accessible when isSeller is true */}
            {isSeller && (
              <>
                <Route index element={<AddProduct />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="orders" element={<Orders />} />
              </>
            )}
          </Route>

          {/* Catch-all fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
