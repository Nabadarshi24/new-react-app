import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest
} from "../../libs/Axios";
import { TypeFormOption } from "../../products/types";
import {
  TypeBkashPaymentCreatePayload,
  TypeCart,
  TypeCartCreate,
  TypeCartCreatePayload,
  TypeCheckoutCreatePayload,
  TypeEditCartPayload,
  TypeOrderDetails,
  TypeProductDeletePayload
} from "../types";

export const addToCart = async (payload: TypeCartCreatePayload) => {
  return await makePostRequest<TypeCartCreate>("/cart/create", payload);
};

export const getPaymentMethodOptions = async () => {
  return await makeGetRequest<TypeFormOption[]>(`/payment/method-options`);
};

export const getCartDetails = async (id: string) => {
  return await makeGetRequest<TypeCart>(`/cart/details/${id}`);
};

export const editCartQuantity = async (payload: TypeEditCartPayload) => {
  return await makePostRequest<TypeCart>("/cart/edit", payload);
};

export const deleteProductFromCart = async (payload: TypeProductDeletePayload) => {
  return await makeDeleteRequest(`/cart/delete`, payload);
};

export const createPayment = async (checkoutId: string) => {
  return await makePostRequest(`/bkash/payment/create/`, { checkoutId })
};

export const createCheckout = async (payload: TypeCheckoutCreatePayload) => {
  return await makePostRequest(`/checkout/create`, payload)
};

export const finalizeOrder = async (checkoutId: string) => {
  return await makePostRequest(`/checkout/${checkoutId}/finalize`)
};

export const getOrderDetails = async (orderId: string) => {
  return await makeGetRequest<TypeOrderDetails>(`/orders/details/${orderId}`)
};

export const getOrders = async () => {
  return await makeGetRequest<TypeOrderDetails[]>(`/orders/my-orders`)
};

