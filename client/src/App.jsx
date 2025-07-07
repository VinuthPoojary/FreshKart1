import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'; // ✅ Make sure this is imported
import Footer from './components/Footer';

// Sub-component so `useLocation()` works safely
function AppContent() {
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <>
      {!isSellerPath && <Navbar />}
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Show toast */}
      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes if needed */}
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </>
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
