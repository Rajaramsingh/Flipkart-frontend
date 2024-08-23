import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleFormSwitch = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        
        const response = await axios.post(
          'http://localhost:8000/users/signup',
          { name, email, password }
        );
        console.log('Registration successful:', response.data);
       
        onClose();
      } else {
        
        const response = await axios.post(
          'http://localhost:8000/users/login',
          { email, password },
          { withCredentials: true }
        );
        console.log('Login successful:', response.data);

        if(response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
       
        onClose(); 
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-xl font-bold mb-4">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md p-2"
                required
              />
            </>
          )}
          {!isRegister && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md p-2"
                required
              />
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <button
          onClick={handleFormSwitch}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          {isRegister ? 'Already have an account? Login' : 'New user? Register'}
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
