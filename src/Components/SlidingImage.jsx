import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { FaLessThan } from 'react-icons/fa';
import { FaGreaterThan } from "react-icons/fa";

const SlidingImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null)
    const [isClicked, setIsClicked] = useState(true)

    const images = [
        'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/31927883206cbd64.jpg?q=20',
        'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8b4e46e572ce96b2.jpg?q=20',
        'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1b011c536d905180.jpg?q=20',
        'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/04bb152bb2d3f429.jpg?q=20',
        'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8b4e46e572ce96b2.jpg?q=20'
    ]

    useEffect(() => {
        if(!isClicked) return;
        const interval = setInterval(() =>{
            setPrevIndex(currentIndex)
            setCurrentIndex((currentIndex) => (currentIndex+1) % images.length);
        },2000);

        return () => clearInterval(interval)
    }, [currentIndex, images.length, isClicked])

    const handleRightClick = () => {
        setIsClicked(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTimeout(() => {
            setIsClicked(true)
        }, 2000);
    };

    const handleLeftClick = () => {
        setIsClicked(false)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setTimeout(() => {
            setIsClicked(true)
        }, 2000);
    };
  return (
    <div className='container'>
        <div className='arrow-icons'>
            <div className='right-icons absolute left-[15px] bottom-[46%] z-10 bg-white px-3 py-9  rounded-r-md' onClick={handleLeftClick}>
                <FaLessThan className='text-zinc-500'/>
            </div>
            <div 
                className="left-icon bg-white absolute right-[15px] bottom-[46%] z-10 px-3 py-9 rounded-l-md"
                onClick={handleRightClick}>
                <FaGreaterThan className='text-zinc-500'/>
            </div>
        </div>
        <div className="slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index == currentIndex ? 'active': index == prevIndex ? 'prev':''}`}
                    style={{backgroundImage: `url(${image})`}}>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SlidingImage
