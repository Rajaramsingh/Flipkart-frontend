import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function CategoryProducts({products, moreProducts}){
    const {categoryName} = useParams();

    useEffect(()=> {
        window.scrollTo(0,0);

    },[categoryName]);

    const updatedProducts = products.filter(product => product.category === categoryName);

    const newProducts = moreProducts.filter(product => product.category === categoryName);

    let finalProducts = [];
    if (updatedProducts.length > 0) {
        finalProducts = updatedProducts;

    }
    else if (newProducts.length >0){
        finalProducts = newProducts;
    }

    const [priceRange, setPriceRange] = useState([0,30000]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const filteredProducts = finalProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1] && (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
    const handlePriceChange = (e) =>{
        const value = e.target.value;
        if(e.target.name == 'min'){
            setPriceRange([value, priceRange[1]])
        }
        else{
            setPriceRange([priceRange[1], value])
        }
    }
    const handleBrandChange =(e)=>{
        const value = e.target.value;
        setSelectedBrands(prev => prev.includes(value)? prev.filter(brand => brand !==value) : [...prev, value])
    }
    const handleSliderChange = (e) => {
        const value = Number(e.target.value);
        setPriceRange([priceRange[0], value])
    }

    return (
        <div className='category-container flex mt-[4.6rem]'>
            <div className='side-bar w-[20%] bg-white m-2 p-4 border-r p-8'>
                <h2 className='font-bold mb-4'>Filters</h2>
                <hr className='mb-4' />
                <p className='font-semibold'>CATEGORIES</p>
                <p className='text-gray-600 mb-4'>{categoryName}</p>

                <p className='font-semibold'>PRICE</p>
                <div className='flex items-center mb-4'>
                    <input type="text" name='min' value={priceRange[0]} onChange={handlePriceChange}  className='border p-1 w-20 mr-2'/>
                    <span>-</span>
                    <input 
            type="number" 
            name="max" 
            value={priceRange[1]} 
            onChange={handlePriceChange} 
            className="border p-1 w-20 ml-2" 
          />
                </div>
                <div className='mb-4'>
                    <input type="range"  min={priceRange[0]} max={30000} value={priceRange[1]} onChange={handleSliderChange} className='w-fill'/>
                </div>
                <p className='font-semibold mb-2'>BRAND</p>
                <div className='flex flex-col mb-2'>
                    {['Samsung','Vivo','Oppo', 'Realme','Poco','Motorola'].map(brand => (
                        <label key={brand} className='mb-1'>
                            <input type="checkbox" 
                            value={brand} onChange={handleBrandChange} className='mr-2'/>
                            {brand}
                        </label>

                    ))}
                </div>
            </div>
            <div className='w-[80%] bg-white m-2 ml-1 p-10'> 
                {filteredProducts.map((product, index) =>(
                    <div key={index} className='products flex justify-start items-start relative border-b-2 mb-10'>
                        <div className={categoryName === "jewelery"? 'p-24 relative right-10' : categoryName === "electronics" ? 'p-14 right-10 relative' : 'p-3'}>
                            <img src={product.image || product.images[0]} alt={product.id}
                            className={categoryName === "jewelery" ? 'h-10' : categoryName === "electronics" ? 'h-32' : 'h-52'} />
                            
                        </div>
                        <div className ={categoryName === "jewelery" ? 'absolute left-52 top-7' : 'absolute left-60 top-7'}>
                            <h2 className='font-bold text-lg w-[80%]'>
                                {product.title}
                            </h2>
                            <p className='text-[#8d8c8c] font-semibold font-sans text-sm mt-2'>
                                <span className='bg-green-700 text-white px-2 py-[2px]rounded mr-2'>{product.rating.rate.count}Star ⭐ </span>
                                {product.rating.count} Ratings & 7419 Reviews
                            </p>
                            <p className='w-72 mt-5 h-24 overflow-hidden'>{product.description}</p>

                        </div>
                        <div className='product-price absolute top-8 right-28'>
              <p className='font-bold text-2xl'>${product.price}</p>
              <p className='text-[#828282] text-sm'>
                <del>$ 239 </del>
                <span className='text-green-500 font-bold'>20% off</span>
              </p>
              <p className='text-[12px]'>Free Delivery by <span className='font-bold'>30th Jul</span></p>
              <p className='text-green-600 font-bold text-[12px]'>Save extra with combo offer</p>
              <p className='text-[12px]'>Upto <span className='font-bold'>$500</span> Off on Exchange</p>
            </div>

                    </div>
                ))}
            </div>
        </div>
    )

}
export default CategoryProducts;
