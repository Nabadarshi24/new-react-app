// import React from 'react';
import {
  Facebook,
  Instagram,
  X
} from '@mui/icons-material';

export const Topbar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>
      <div className="container mx-auto flex justify-between items-center">
        <div className='hidden md:flex items-center space-x-4'>
          <a href="#" className='hover:text-gray-300'>
            <Facebook className='w-5 h-5' />
          </a>
          <a href="#" className='hover:text-gray-300'>
            <Instagram className='w-5 h-5' />
          </a>
          <a href="#" className='hover:text-gray-300'>
            <X className='w-5 h-5' />
          </a>
        </div>
        <div className="text-sm text-center flext-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890">+123 456 7890</a>
        </div>
      </div>
    </div>
  );
};
