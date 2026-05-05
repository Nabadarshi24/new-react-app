// import React from 'react';

import { Delete } from "@mui/icons-material";
import { TypeCartItem, TypeProductDeletePayload } from "../../types";
import { useAccountStore } from "../../../stores/GlobalStore";
import { deleteProductFromCart } from "../../api";
import { showErrorMessage, showSuccessMessage } from "../../../helper/Helper";

type TypeProps = {
  products: TypeCartItem[];
  doOnDelete?: () => void;
}

export const CartContent = ({ products, doOnDelete }: TypeProps) => {

  const setLoading = useAccountStore(store => store.setIsLoading);

  const handleDelete = async ({ productId, guestId, userId, size, color }: TypeProductDeletePayload) => {
    // TODO: Implement remove from cart
    try {
      setLoading(true);

      const payload: TypeProductDeletePayload = {
        productId,
        guestId,
        userId,
        size,
        color
      };

      const response = await deleteProductFromCart(payload);
      if (response?.success) {
        showSuccessMessage(response.successMessage);

        // TODO: Refresh cart data
        doOnDelete?.();
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        products.map(product => (
          <div
            key={product.productId}
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
              <button
                className="tw:cursor-pointer tw:mt-2 tw:text-red-600"
                onClick={() => handleDelete({
                  productId: product.productId,
                  guestId: '',
                  userId: '69f6e486d4bfdab0ac981138',
                  size: product.size,
                  color: product.color
                })}
              >
                <Delete />
              </button>
            </div>
          </div>
        ))
      }
    </>
  );
};
