// import React from 'react';

import { Delete } from "@mui/icons-material";
import { TypeCartItem, TypeProductDeletePayload } from "../../types";
import { useAccountStore } from "../../../stores/GlobalStore";
import { deleteProductFromCart, editCartQuantity } from "../../api";
import { showErrorMessage, showSuccessMessage } from "../../../helper/Helper";
import { useCallback, useState } from "react";

type TypeProps = {
  products: TypeCartItem[];
  doOnDelete?: () => void;
}

export const CartContent = ({
  products,
  doOnDelete
}: TypeProps) => {

  // const [cartProducts, setCartProducts] = useState(products)
  // const [quantity, setQuantity] = useState<number | null>(null)

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

  const handleQuantityChange = useCallback(async (action: string, _id: string) => {
    try {
      setLoading(true);
      const product = products.find(p => p._id === _id);
      if (!product) return;

      let newQuantity;

      if (action == "increase") {
        newQuantity = product.quantity + 1;
      } else if (action == "decrease") {
        if (product.quantity > 1) {
          newQuantity = product.quantity - 1;
        }
      }

      const response = await editCartQuantity({ _id, userId: loggedInUserObj?.userId, quantity: newQuantity });

      if (response?.success && response.data) {
        // showSuccessMessage(response.successMessage);
        // setCartProducts(response.data.products);
        doOnDelete();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [products]);

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
                    onClick={() => handleQuantityChange("decrease", product._id)}
                    className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold"
                  >
                    -
                  </button>
                  <span className="tw:mx-4">{product.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase", product._id)}
                    className="tw:cursor-pointer tw:border tw:rounded tw:px-[10px] tw:py-[5px] tw:text-xl tw:font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>$ {(product.price).toLocaleString()}</p>
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
