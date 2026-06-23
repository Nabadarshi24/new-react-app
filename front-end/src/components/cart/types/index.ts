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

export type TypeProductDeletePayload = {
  productId: string;
  guestId: string;
  userId: string;
  size: string;
  color: string;
};

export type TypeShippingAddress = {
  // email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  paymentMethod: string;
};

export type TypeBkashPaymentCreatePayload = {
  orderId?: string;
  amount: number;
};
