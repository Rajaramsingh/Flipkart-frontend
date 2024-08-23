import React from 'react'
import {Link} from 'react-router-dom';

const ProductList = ({title, products}) => {
  return (
    <div className='product-container bg-white p-4 w-[98%] mx-auto mt-5'>
      <h2 className='mb-4 text-xl font-bold'>{title}</h2>
      <div className='box-container flex overflow-x-auto space-x-4 hide-scrollbar'>
        {products.map((product, index) =>(
          <Link key={index} to={`/category/${product.category}`}>
            <div className='box bg-white border-2 w-52 flex-shrink-0 p-3'>
              <div className='img h-60 overflow-hidden'>
                <img src={product.image || product.images [0]} alt={product.id}
                className='h-56 w-full object-contain hover:scale-105' />
              </div>
              <div className='title mt-2'>
                <p className='overflow-hidden h-5 text-center text-sm'>{product.title}</p>
              </div>
              <div className='price text-gray-700 font-bold text-center text-sm'>{`from $${product.price}`}</div>

            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default ProductList
