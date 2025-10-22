// import React from 'react';

import { Delete } from "@mui/icons-material";

const products = [
  {
    id: 1,
    name: "T-shirt",
    size: "M",
    color: "Red",
    price: 15,
    quantity: 1,
    image: "https://picsum.photos/200?random=1"
  },
  {
    id: 2,
    name: "Jeans",
    size: "L",
    color: "Blue",
    price: 15,
    quantity: 1,
    image: "https://picsum.photos/200?random=2"
  }
]

export const CartContent = () => {

  return (
    <div>
      {
        products.map(product => (
          <div
            key={product.id}
            className='tw:flex tw:items-start tw:justify-between tw:py-4 tw:border-b'
          >
            <div className="tw:flex tw:items-start">
              <img
                src={product.image}
                alt={product.name}
                className='tw:w-20 tw:h-24 tw:object-cover tw:rounded'
              />
              <div className="tw:ml-4">
                <h3>{product.name}</h3>
                <p className="tw:text-sm tw:text-gray-500">Size: {product.size} | Color: {product.color}</p>
                <div className="tw:flex tw:items-center tw:mt-2">
                  <button className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold">-</button>
                  <span className="tw:mx-4">{product.quantity}</span>
                  <button className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold">+</button>
                </div>
              </div>
            </div>
            <div>
              <p>$ {product.price.toLocaleString()}</p>
              <button className="tw:cursor-pointer tw:mt-2 tw:text-red-600"><Delete /></button>
            </div>
          </div>
        ))
      }
    </div>
  );
};
