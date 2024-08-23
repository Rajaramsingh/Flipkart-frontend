import React from 'react'

const MenuItems = () => {
    const menuData = [
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100', name: 'Grocery' },
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100', name: 'Fashion' },
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100', name: 'Home' },
        { image: 'https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100', name: 'Electronics' },
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100', name: 'Home' },
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100', name: 'Grocery' },
        { image: 'https://rukminim2.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100', name: 'Home' },
        { image: 'https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100', name: 'Electronics' },
      ];
  return (
    <div className='menu-container overflow-hidden mt-[4.8rem]'>
        <div className='bg-white mx-4 mt-2 flex justify-center items-center'>
            {menuData.map((item, index) => (
                <div key={index} className='menu-items p-5 text-center mx-4'>
                    <div className='item-image'>
                        <img src={item.image} alt={item.name}/>
                    </div>
                    <div className='item-name'>
                        <p className='font-bold'>{item.name}</p>
                    </div>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default MenuItems
