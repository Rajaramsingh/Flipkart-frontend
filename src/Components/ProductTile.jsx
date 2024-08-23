import React, { useContext } from 'react';
import { GiFragrance } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ProductTile = ({ title, products, idx }) => {
  const { addToCart } = useContext(CartContext);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className='tile-conatiner bg-white p-5 w-[32%] mt-5 ml-4'>
      <h2 className='mb-4 text-xl font-bold'>{title}</h2>
      <div className='tile-box-container'>
        <div className='flex items-center gap-2'>
          <Link to={`/category/${products[idx].category}`}>
            <div className='box bg-white border-2 w-56 p-3 rounded-sm'>
              <div className='img overflow-hidden'>
                <img
                  src={products[idx].image}
                  alt={products[idx].id}
                  className='h-56 w-full object-contain hover:scale-105'
                />
              </div>
              <div className='title mt-2'>
                <p className='overflow-hidden h-5 text-center text-sm'>{products[idx].title}</p>
              </div>
              <div className="price text-gray-700 font-bold text-center text-sm">
                {`From $${products[idx].price}`}
              </div>
              <button
                onClick={() => addToCart(products[idx])}
                className="bg-blue-500 text-white w-full mt-2 p-1 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </Link>
          <Link to={`/category/${products[idx + 1].category}`}>
            <div className="box bg-white border-2 w-56 p-3 rounded-sm">
              <div className="img overflow-hidden">
                <img
                  src={products[idx + 1].image}
                  alt={products[idx + 1].id}
                  className="h-56 w-full object-contain hover:scale-105"
                />
              </div>
              <div className="title mt-2">
                <p className="overflow-hidden h-5 text-center text-sm">{products[idx + 1].title}</p>
              </div>
              <div className="price text-gray-700 font-bold text-center text-sm">
                {`From $${products[idx + 1].price}`}
              </div>
              <button
                onClick={() => addToCart(products[idx + 1])}
                className="bg-blue-500 text-white w-full mt-2 p-1 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        </div>

        <div className='flex items-center mt-2 gap-2'>
          <Link to={`/category/${products[idx + 2].category}`}>
            <div className="box bg-white border-2 w-56 p-3 rounded-sm">
              <div className="img overflow-hidden">
                <img
                  src={products[idx + 2].image}
                  alt={products[idx + 2].id}
                  className="h-56 w-full object-contain hover:scale-105"
                />
              </div>
              <div className="title mt-2">
                <p className="overflow-hidden h-5 text-center text-sm">{products[idx + 2].title}</p>
              </div>
              <div className="price text-gray-700 font-bold text-center text-sm">
                {`From $${products[idx + 2].price}`}
              </div>
              <button
                onClick={() => addToCart(products[idx + 2])}
                className="bg-blue-500 text-white w-full mt-2 p-1 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </Link>
          <Link to={`/category/${products[idx + 3].category}`}>
            <div className="box bg-white border-2 w-56 p-3 rounded-sm">
              <div className="img overflow-hidden">
                <img
                  src={products[idx + 3].image}
                  alt={products[idx + 3].id}
                  className="h-56 w-full object-contain hover:scale-105"
                />
              </div>
              <div className="title mt-2">
                <p className="overflow-hidden h-5 text-center text-sm">{products[idx + 3].title}</p>
              </div>
              <div className="price text-gray-700 font-bold text-center text-sm">
                {`From $${products[idx + 3].price}`}
              </div>
              <button
                onClick={() => addToCart(products[idx + 3])}
                className="bg-blue-500 text-white w-full mt-2 p-1 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
