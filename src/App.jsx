import './App.css'
import React, { useEffect, useState } from 'react'
import { CartProvider } from './contexts/CartContext'
import { UserProvider } from './contexts/UserContext'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './Components/Navbar'
import MenuItems from './Components/MenuItems';
import SlidingImage from './Components/SlidingImage';
import ProductList from './Components/ProductList';
import ProductTile from './Components/ProductTile';
import Advertise from './Components/Advertise';
import Footer from './Components/Footer';
import CategoryProducts from './Components/category/CategoryProducts';
import ErrorPage from './Components/category/ErrorPage';



const App = () => {
  const [products,setProducts] =useState([]);
  const [moreProducts,setMoreProducts] = useState([]);
  const [menClothes, setMenClothes] = useState([]);
  const [womenClothes, setWomenClothes] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [furniture, setFurniture] = useState([]);

  useEffect(()=> {
    const fetchProducts = async () =>{
      try{
        const response = await fetch('https://fakestoreapi.com/products');
        if(!response.ok){
          throw new Error('cannot fetch Products')
        }
        const result = await response.json();
        setProducts(result);
        console.log(result)
      }
      catch (error) {
        console.error('Network error', error);
      }
    };
    fetchProducts();
  },[]);

  useEffect(()=>{
    if(products.length > 0){

      const men = products.filter(product => product.category === "men's clothing" || product.category === 'jewelery');
      const women = products.filter(product => product.category === "women's clothing");
      const electronics = products.filter(product => product.category === "electronics");

      setMenClothes(men);
      setWomenClothes(women);
      setElectronics(electronics);
    }
  }, [products]);

  useEffect(()=>{
    const fetchMoreProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if(!response.ok){
          throw new Error('cannot fetch more products');
        }
        const result = await response.json();
        setMoreProducts(result.products);
        console.log(result);
      }
      catch(error){
        console.error('Network error', error);
      }
    };
    fetchMoreProducts();
  }, []);

  useEffect(()=> {
    if(moreProducts.length > 0){
      const beautyProduct = moreProducts.filter(product => product.category === 'beauty');
      const fragranceProduct = moreProducts.filter(product => product.category === 'fragrances');
      const furnitureProduct = moreProducts.filter(product => product.category === 'furniture' || product.category === 'groceries');

      setBeauty(beautyProduct);
      setFragrances(fragranceProduct);
      setFurniture(furnitureProduct);
    }
  }, [moreProducts]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
        <Navbar products ={products} moreProducts={moreProducts}/>
        <MenuItems/>
        <SlidingImage/>
        <ProductList title ="Trending Products"
        products = {menClothes}/>

        <div className='add-title flex'>
          <ProductTile title ="Suggested For You" products={ electronics} idx={0}/>
          <Advertise/>
        </div>
        <div className='tiles flex'>
          <ProductTile title ="Best Quality" products={womenClothes} idx={0}/>
          <ProductTile title="Top Selection" products={menClothes} idx={3} /> 
          <ProductTile title="Recomended For You" products={electronics} idx={2} /> 
        </div>

        <div className='flex'>
        <ProductList title="Beauty Products" products={beauty} />
        </div>

        <ProductList title="Other Products" products={furniture} />
          <div className="footer">
            <Footer/>
          </div>
        </>
      )
    },
    {
      path: '/category/:categoryName',
      element: (
      <>
        <Navbar products={products} moreProducts={moreProducts}/>
        <CategoryProducts products={products} moreProducts={moreProducts} />
        <Footer/>
      </>
      ) 
    },
    {
      path: '/category/error',
      element: (
        <>
          <Navbar products={products} moreProducts={moreProducts}/>
          <ErrorPage/>
        </>
      )
    }
    
  ])
  return (
    <UserProvider>
    <CartProvider>
    <RouterProvider router ={router}></RouterProvider>
    </CartProvider>
    </UserProvider>
  )
}

export default App
