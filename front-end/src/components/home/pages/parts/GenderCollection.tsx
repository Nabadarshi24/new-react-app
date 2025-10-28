// import React from 'react'

import { Link } from "react-router"

export const GenderCollection = () => {
  return (
    <div className="tw:py-16 tw:px-4 tw:lg:px-0">
      <div className="tw:container tw:mx-auto tw:flex tw:flex-col tw:md:flex-row tw:gap-8">
        <div className="tw:relative tw:flex-1">
          <img
            src="/images/womens_collection.webp"
            alt="Women's Collection"
            className="tw:w-full tw:h-[700px] tw:object-cover"
          />
          <div className="tw:absolute tw:bottom-8 tw:left-8 tw:bg-white tw:bg-white/90 tw:p-4">
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="tw:text-gray-900 tw:underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="tw:relative tw:flex-1">
          <img
            src="/images/mens_collection.webp"
            alt="Women's Collection"
            className="tw:w-full tw:h-[700px] tw:object-cover"
          />
          <div className="tw:absolute tw:bottom-8 tw:left-8 tw:bg-white tw:bg-white/90 tw:p-4">
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="tw:text-gray-900 tw:underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
