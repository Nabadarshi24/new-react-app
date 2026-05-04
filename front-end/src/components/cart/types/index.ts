export type CartCreatePayload = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
  userId?: string;
  guestId?: string;
};
export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

export type Cart = {
  _id: string;
  user: string;
  guestId: string;
  products: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type CartCreate = {
  id: string;
  itemsCount: number;
};

export type ProductDeletePayload = {
  productId: string;
  guestId: string;
  userId: string;
  size: string;
  color: string;
};
