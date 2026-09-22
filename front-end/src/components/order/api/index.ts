import { makeGetRequest } from "../../libs/Axios";
import { TypeOrderDetails } from "../types";

export const getOrderDetails = async (orderId: string) => {
    return await makeGetRequest<TypeOrderDetails>(`/orders/details/${orderId}`)
};

export const getOrders = async () => {
    return await makeGetRequest<TypeOrderDetails[]>(`/orders/my-orders`)
};