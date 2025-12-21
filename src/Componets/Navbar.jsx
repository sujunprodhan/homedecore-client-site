import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import { FiMenu, FiX, FiHome, FiInfo, FiPhone, FiShoppingBag, FiUser } from 'react-icons/fi';
import { AuthSpinner } from '../AuthLayoute/AuthProvider';


const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success('Logged out successfully'))
      .catch((error) => toast.error(error.message));
  };

  const navLinkClass = (path) =>
    location.pathname === path
      ? 'text-[#E92C8F] font-semibold flex items-center gap-2'
      : 'text-gray-700 hover:text-pink-600 transition flex items-center gap-2';

  return (
    <>
      {/* Loading Spinner*/}
      {loading && <AuthSpinner />}

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#E92C8F] text-white flex items-center justify-center font-bold">
              HD
            </div>
            <span className="text-xl font-semibold">
              Home <span className="text-[#E92C8F]">Decor</span>
            </span>
          </Link>

          {/* Center Menu (Desktop) */}
          <div className="hidden md:flex gap-8 font-medium">
            <Link to="/" className={navLinkClass('/')}>
              <FiHome /> Home
            </Link>
            <Link to="/services" className={navLinkClass('/services')}>
              <FiShoppingBag /> Services
            </Link>
            <Link to="/about" className={navLinkClass('/about')}>
              <FiInfo /> About
            </Link>
            <Link to="/contact" className={navLinkClass('/contact')}>
              <FiPhone /> Contact
            </Link>
            <Link to="/dashboard/my-booking" className={navLinkClass('/dashboard/my-booking')}>
              <FiUser /> My Booking
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <img
                  onClick={() => setUserOpen(!userOpen)}
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border cursor-pointer object-cover"
                />
                {userOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white border rounded-xl shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{user.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border rounded-lg hover:border-pink-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#E92C8F] text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-4 bg-white">
            <Link to="/" className={navLinkClass('/')}>
              <FiHome /> Home
            </Link>
            <Link to="/services" className={navLinkClass('/services')}>
              <FiShoppingBag /> Services
            </Link>
            <Link to="/about" className={navLinkClass('/about')}>
              <FiInfo /> About
            </Link>
            <Link to="/contact" className={navLinkClass('/contact')}>
              <FiPhone /> Contact
            </Link>
            <Link to="/bookingpage" className={navLinkClass('/bookingpage')}>
              <FiUser /> Booking Now
            </Link>
          
            <hr />

            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="user" />
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-[#E92C8F] text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="py-2 text-center border rounded-lg hover:border-pink-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 text-center bg-[#E92C8F] text-white rounded-lg hover:bg-pink-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
