import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold">Dukaan</h2>
          <p className="mt-2 text-lg">Contact us: www.Dukaan.com</p>
          <p className="mt-2 text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="flex justify-around md:justify-between w-full md:w-1/2 mt-4 md:mt-0">
          <div className="text-center md:text-left">
            <h3 className="font-semibold">About</h3>
            <ul>
              <li className="mt-2">
                <a href="#" className="hover:underline">Company Info</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Press Releases</a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-semibold">Help</h3>
            <ul>
              <li className="mt-2">
                <a href="#" className="hover:underline">Payment</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Shipping</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Cancellation</a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-semibold">Policy</h3>
            <ul>
              <li className="mt-2">
                <a href="#" className="hover:underline">Return Policy</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
