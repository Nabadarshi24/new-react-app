import { TypeCartItem, TypeShippingAddress } from "../../cart/types";

type TypeOrderItem = {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    //   size: string;
    //   color: string;
};

export type TypeOrderDetails = {
    _id: string;
    user: Record<string, any>;
    shippingAddress: TypeShippingAddress;
    orderItems: TypeOrderItem[];
    totalPrice: number;
    paymentMethod: string;
    isPaid: boolean;
    isDelivered: boolean;
    paymentStatus: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};