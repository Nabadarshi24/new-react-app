// import React from 'react'

import { Link } from "react-router";
import { TypeSimilarProduct } from "../../types";

type TypeProps = {
  products: TypeSimilarProduct[];
};

export const ProductGrid = ({ products }: TypeProps) => {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-4 tw:gap-4">
      {
        products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="tw:block"
          >
            <div className="tw:bg-white tw:p-4 tw:rounded-lg">
              <div className="tw:w-full tw:h-96 tw:mb-4">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="tw:w-full tw:h-full tw:object-cover tw:rounded-lg"
                />
              </div>
              <h3 className="tw:text-sm tw:mb-2">{product.name}</h3>
              <p className="tw:text-gray-500 tw:font-medium tw:text-sm tw:tracking-tighter">$ {product.price}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};
