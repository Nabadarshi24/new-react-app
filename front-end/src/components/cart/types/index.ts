export type TypeCartCreatePayload = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  userId?: string;
  guestId?: string;
};
export type TypeCartItem = {
  _id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

export type TypeCart = {
  _id: string;
  user: string;
  guestId: string;
  products: TypeCartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type TypeCartCreate = {
  id: string;
  itemsCount: number;
};

export type TypeEditCartPayload = {
  _id: string;
  userId: string
  quantity: number;
};

export type TypeProductDeletePayload = {
  productId: string;
  guestId: string;
  userId: string;
  size: string;
  color: string;
};

export type TypeShippingAddress = {
  // email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  paymentMethod?: string;
};

export type TypeBkashPaymentCreatePayload = {
  checkoutId: string;
};

export type TypeCheckoutCreatePayload = {
  shippingAddress: TypeShippingAddress;
  checkoutItems: TypeCartItem[];
  paymentMethod: string;
  totalPrice: number;
};

export type TypeOrderDetails = {
  _id: string;
  user: Record<string, any>;
  shippingAddress: TypeShippingAddress;
  orderItems: TypeCartItem[];
  totalPrice: number;
  paymentMethod: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
