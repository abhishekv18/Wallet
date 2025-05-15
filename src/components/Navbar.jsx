// import React from 'react'

// const Navbar = () => {
 
//   return (
//     <nav className="bg-gray-900 border-b border-gray-800 py-3">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <span className="text-2xl mr-2">🪙</span>
//           <span className="text-xl font-bold text-white">CryptoVault</span>
//         </div>
      
//       </div>
//     </nav>
//   );
// };


// export default Navbar
import React from 'react';
import { FaWallet } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo and Name */}
        <div className="flex items-center space-x-2">
          <FaWallet className="text-yellow-400 text-2xl" />
          <span className="text-2xl font-bold text-white hover:text-yellow-400 transition duration-200">
            CryptoVault
          </span>
        </div>

        {/* Optional Navigation / CTA Button */}
        {/* <div>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded transition">
            Connect Wallet
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
