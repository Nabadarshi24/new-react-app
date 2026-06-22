import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest
} from "../../libs/Axios";
import { TypeFilterOption } from "../../products/types";
import {
  TypeBkashPaymentCreatePayload,
  TypeCart,
  TypeCartCreate,
  TypeCartCreatePayload,
  TypeProductDeletePayload
} from "../types";

export const addToCart = async (payload: TypeCartCreatePayload) => {
  return await makePostRequest<TypeCartCreate>("/cart/create", payload);
};

export const getPaymentMethodOptions = async () => {
  return await makeGetRequest<TypeFilterOption>(`/payment/method-options`);
};

export const getCartDetails = async (id: string) => {
  return await makeGetRequest<TypeCart>(`/cart/details/${id}`);
};

export const deleteProductFromCart = async (payload: TypeProductDeletePayload) => {
  return await makeDeleteRequest(`/cart/delete`, payload);
};

export const createPayment = async (payload: TypeBkashPaymentCreatePayload) => {
  return await makePostRequest(`/bkash/payment/create/`, payload)
}
