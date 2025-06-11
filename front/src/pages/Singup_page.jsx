import React, { useState } from 'react';
import { signupUser } from '../features/cart/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const SignupPage = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    dispatch(signupUser(formData))
     setFormData({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-gray-500">Create your new account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First row - Name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            </div>

            {/* Second row - Password + Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-gray-700 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                required
                rows={2}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login"  className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
