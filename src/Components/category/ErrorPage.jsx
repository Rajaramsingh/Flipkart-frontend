import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () =>{
        navigate('/');
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 pb-32'>
        <FaExclamationTriangle size={50} className='text-red-500 mb-4'/>
        <h1 className='text-4xl font-bold mb-2'>Product Not Found</h1>
        <p className='text-lg mb-6'>The product you're looking for does not exist.</p>
        <button onClick={handleBackToHome} className='"bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"'>
          Back To Home</button>
      
    </div>
  )
}

export default ErrorPage
