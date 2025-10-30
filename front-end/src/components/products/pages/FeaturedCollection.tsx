// import React from 'react'

import { Link } from "react-router";

export const FeaturedCollection = () => {
  return (
    <section className="tw:py-16 tw:px-4 tw:lg:px-0">
      <div className="tw:container tw:mx-auto tw:flex tw:flex-col-reverse tw:lg:flex-row tw:items-center tw:bg-green-50 tw:rounded-3xl">
        {/* Left Content */}
        <div className="tw:lg:w-1/2 tw:p-8 tw:text-center tw:lg:text-left">
          <h2 className="tw:text-lg tw:font-semibold tw:text-gray-700 tw:mb-2">Comfort and Style</h2>
          <h2 className="tw:text-4xl tw:lg:text-5xl tw:font-bold tw:mb-6">Apparel made for your everyday life</h2>
          <p className="tw:text-lg tw:text-gray-600 tw:mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great everyday.
          </p>
          <Link to="/collection/all" className="tw:bg-black tw:text-white tw:px-6 tw:py-3 tw:rounded-lg tw:text-lg tw:hover:bg-gray-800">Shop Now</Link>
        </div>

        {/* Right Content */}
        <div className="tw:lg:w-1/2">
          <img
            src="/images/featured.webp"
            alt="Featured Collection"
            className="tw:w-full tw:h-full tw:object-cover tw:rounded-tr-3xl tw:rounded-br-3xl" />
        </div>
      </div>
    </section>
  );
};
