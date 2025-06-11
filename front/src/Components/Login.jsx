import React, { useState, useEffect } from 'react';
import { loginUser } from '../features/cart/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { use } from 'react';
const Login = () => {

  const navigate = useNavigate()
    const dispatch = useDispatch()    
    const accessToken = useSelector((state) => state.auth.accessToken)
    console.log(accessToken)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // redirect if token present 
  useEffect(()=>{
  if(accessToken){
  navigate('/')
  }
  },[accessToken,navigate])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);

    try{
   dispatch(loginUser({ email, password }))
    }
      catch(err){
        console.log(err)
      }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500">Please login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            
            <label className="text-left block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-left block mb-2 mb-2 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <button onClick={()=> navigate('/signup')} className="text-indigo-600 font-medium hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
