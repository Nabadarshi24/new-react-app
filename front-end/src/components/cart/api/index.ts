import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest
} from "../../libs/Axios";
import {
  Cart,
  CartCreate,
  CartCreatePayload,
  ProductDeletePayload
} from "../types";

export const addToCart = async (payload: CartCreatePayload) => {
  return await makePostRequest<CartCreate>("/cart/create", payload);
};

export const getCartDetails = async (id: string) => {
  return await makeGetRequest<Cart>(`/cart/details/${id}`);
};

export const deleteProductFromCart = async (payload: ProductDeletePayload) => {
  return await makeDeleteRequest(`/cart/delete`, payload);
};
