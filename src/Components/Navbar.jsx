import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { BsCart3, BsShopWindow } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate, Link } from 'react-router-dom';

import Cart from './Cart';  
import Modal from './Modal';
import { UserContext } from '../contexts/UserContext';

const Navbar = ({ products, moreProducts }) => {
  const { cart } = useContext(CartContext);
  const {user, logoutUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
  const [registerInputs, setRegisterInputs] = useState({ username: '', password: '' });


  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const flag = products.some(product => {
      if (product.category.includes(searchText)) {
        setSearchText(product.category);
        navigate(`/category/${product.category}`);
        return true;
      }
    });

    const flag1 = moreProducts.some(product => {
      if (product.category.includes(searchText)) {
        setSearchText(product.category);
        navigate(`/category/${product.category}`);
        return true;
      }
    });

    if (!flag && !flag1) navigate(`/category/error`);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
    setLoginInputs({ username: '', password: '' });

  };
  const handleLogout =() =>{
    logoutUser();
    setIsModalOpen(false);

  }

  return (
    <>
      <header className='bg-blue-500 p-1 fixed w-full z-10 top-0'>
        <div className='flex justify-between items-center px-4 py-1'>
          <div className='flex items-center w-full'>
            <div className='nav-logo p-2 flex-shrink-0 ml-20 cursor-pointer'>
              <Link to={'/'}>
                <img src="/flipkart.png" alt="Flipkart Logo" className='w-[100px] h-[40px] object-contain' />
              </Link>
            </div>
            <div className='nav-search-box relative flex-1 max-md:hidden ml-5'>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder='Search for Products, Brands and More'
                  className='w-full h-10 rounded-md pl-12 text-md outline-none'
                  onChange={handleChange}
                  value={searchText}
                />
                <div className='search-icon'>
                  <img src="/search-icon.png" alt="search-icon" className='h-5 absolute top-0 ml-3 mt-2 opacity-80' />
                </div>
                <button type='submit' style={{ display: 'none' }}></button>
              </form>
            </div>
          </div>
          <div className='nav-buttons flex justify-evenly items-center text-white ml-10'>
            {user ? (
              <div className='flex-item-center'>
                <span>Welcome, {user.name}</span>
                <button onClick={handleLogout} className='p-2 text-lg font-medium ml-3'>
                  logout
                </button>
                </div>
            ):(
            <div className='nav-cart flex items-center cursor-pointer' onClick={handleLoginClick}>
              <CgProfile size={22} />
              <p className='p-3 text-lg font-medium'>Login</p>
            </div>
          )}
            
            <div className='nav-login-button ml-10 flex items-center cursor-pointer relative'>
              <BsCart3 size={22} onClick={handleCartClick} />
              <p className='p-2 text-lg font-medium'>Cart({cart.length})</p>
              {isCartOpen && (
                <div className="cart-dropdown absolute right-0 mt-2 w-96 bg-white text-black shadow-lg rounded p-4">
                  <Cart />
                </div>
              )}
            </div>
            <div className="nav-login-button ml-10 flex items-center cursor-pointer w-60">
              <BsShopWindow size={22} />
              <p className='p-2 text-lg font-medium'>Become a Seller</p>
            </div>
          </div>
        </div>
      </header>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
