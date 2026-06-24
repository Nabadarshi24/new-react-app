// import React from 'react';

import { Delete } from "@mui/icons-material";
import { TypeCartItem, TypeProductDeletePayload } from "../../types";
import { useAccountStore } from "../../../stores/GlobalStore";
import { deleteProductFromCart } from "../../api";
import { showErrorMessage, showSuccessMessage } from "../../../helper/Helper";
import { useState } from "react";

type TypeProps = {
  products: TypeCartItem[];
  doOnDelete?: () => void;
}

export const CartContent = ({ products, doOnDelete }: TypeProps) => {

  const [quantity, setQuantity] = useState<number | null>(null)
  const loggedInUser = localStorage.getItem("loggedUser");
  const loggedInUserObj = loggedInUser ? JSON.parse(loggedInUser) : null;

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

  const handleQuantityChange = (action: string, _id: string, productId: string, color: string, size: string) => {
    console.log("handleQuantityChange", action, _id, color, size);
    const product = products.find(p => p._id === _id && p.color === color && p.size === size);
    console.log({ product });
    if (!product) return;

    if (action == "increase") {
      console.log("increase");
      setQuantity(prev => prev ? prev + 1 : product.quantity + 1);
    } else if (action == "decrease") {
      if (quantity > 1) {
        console.log("decrease");
        setQuantity(prev => prev ? prev - 1 : product.quantity - 1);
      }
    }
  };

  return (
    <>
      {
        products.map(product => (
          <div
            key={product._id}
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
                  <button
                    onClick={() => handleQuantityChange("decrease", product._id, product.productId, product.color, product.size)}
                    className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold"
                  >
                    -
                  </button>
                  <span className="tw:mx-4">{quantity ?? product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase", product._id, product.productId, product.color, product.size)}
                    className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>$ {((product.price / product.quantity) * (quantity ?? product.quantity)).toLocaleString()}</p>
              <button
                className="tw:cursor-pointer tw:mt-2 tw:text-red-600"
                onClick={() => handleDelete({
                  productId: product.productId,
                  guestId: '',
                  userId: loggedInUserObj?.userId,
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
