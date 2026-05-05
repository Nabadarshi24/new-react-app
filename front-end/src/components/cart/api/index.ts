import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest
} from "../../libs/Axios";
import {
  TypeCart,
  TypeCartCreate,
  TypeCartCreatePayload,
  TypeProductDeletePayload
} from "../types";

export const addToCart = async (payload: TypeCartCreatePayload) => {
  return await makePostRequest<TypeCartCreate>("/cart/create", payload);
};

export const getCartDetails = async (id: string) => {
  return await makeGetRequest<TypeCart>(`/cart/details/${id}`);
};

export const deleteProductFromCart = async (payload: TypeProductDeletePayload) => {
  return await makeDeleteRequest(`/cart/delete`, payload);
};
