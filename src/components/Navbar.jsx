import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user, setUser, setShowUserLogin, navigate,
    setSearchQuery, searchQuery, getCartCount
  } = useAppContext();
  const [inputText, setInputText] = React.useState("");

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="hover:text-green-600">Home</NavLink>
        <NavLink to="/products" className="hover:text-green-600">All Product</NavLink>
        <NavLink to="/contact" className="hover:text-green-600">Contact</NavLink>

        {/* Search Input with Search Icon */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full relative">
          <input
            className="py-1.5 w-64 bg-transparent outline-none placeholder-gray-500 pr-10"
            type="text"
            placeholder="Search products"
            value={inputText}
            onChange={(e) => {
              const value = e.target.value;
              setInputText(value);
              setSearchQuery(value);
            }}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800"
            title="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
            </svg>
          </button>
        </div>

        {/* Cart Icon */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#00B207] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Login/Profile */}
        {!user ? (
          <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-[#00B207] hover:bg-[#00a106] text-white font-semibold rounded-full shadow-md">
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li onClick={() => navigate("my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
              <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className='flex items-center gap-6 sm:hidden'>
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#00B207] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start space-y-3 px-5 text-sm md:hidden z-40">
          <NavLink to="/" onClick={() => setOpen(false)} className="w-full font-medium">Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="w-full font-medium">All Product</NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)} className="w-full font-medium">My Orders</NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)} className="w-full font-medium">Contact</NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-8 py-2 bg-[#00B207] hover:bg-[#00a106] text-white font-semibold rounded-full shadow-md"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-8 py-2 bg-[#00B207] hover:bg-[#00a106] text-white font-semibold rounded-full shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
