// import React from 'react'

import { Link } from "react-router";
import { TypeProduct } from "../../types";

type TypeProps = {
  products: TypeProduct[];
};

export const ProductGrid = ({ products }: TypeProps) => {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-4 tw:gap-4">
      {
        products.map((product) => (
          <Link
            to={`/product/details/${product._id}`}
            key={product._id}
            className="tw:block"
          >
            <div className="tw:bg-white tw:p-4 tw:rounded-lg">
              <div className="tw:w-full tw:h-96 tw:mb-4">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText}
                  className="tw:w-full tw:h-full tw:object-cover tw:rounded-lg"
                />
              </div>
              <h3 className="tw:text-sm tw:mb-2">{product.images[0].altText}</h3>
              <p className="tw:text-gray-500 tw:font-medium tw:text-sm tw:tracking-tighter">
                {
                  product.minPrice === product.maxPrice
                    ? `$${product.minPrice}`
                    : `$${product.minPrice} - $${product.maxPrice}`
                }
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};
