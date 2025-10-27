// import React from 'react';
import { Link } from 'react-router';
import { icons } from '../utils/Helpers';

export const Topbar = () => {
  return (
    <div className='tw:bg-[#ea2e0e] tw:text-white'>
      <div className="tw:container tw:mx-auto tw:flex tw:justify-between tw:items-center tw:py-3 tw:px-4">
        <div className='tw:hidden tw:md:flex tw:items-center tw:space-x-4'>
          <Link to="#" className='tw:hover:text-grey'>
            <icons.Facebook className='w-5 h-5' />
          </Link>
          <Link to="#" className='tw:hover:text-grey'>
            <icons.Instagram className='w-5 h-5' />
          </Link>
          <Link to="#" className='tw:hover:text-grey'>
            <icons.X className='w-4 h-4' />
          </Link>
        </div>
        <div className="tw:text-sm tw:text-center tw:flex-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="tw:text-sm tw:hidden tw:md:block">
          <a href="tel:+1234567890">+123 456 7890</a>
        </div>
      </div>
    </div>
  );
};
