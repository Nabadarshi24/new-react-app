export type TypeSelectedProduct = {
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  brand: string;
  material: string;
  sizes: string[];
  colors: string[];
  images: {
    url: string;
    altText: string;
  }[];
};

export type TypeProduct = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  discountPrice: number;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material: string;
  gender: string;
  images: {
    _id: string;
    url: string;
    altText: string;
  }[];
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  numberOfReviews: number;
  tags: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type TypeSimilarProduct = {
  _id: string;
  name: string;
  price: number;
  images: {
    url: string;
  }[];
};

export type TypeFilterOption = {
  value: string;
  label: string;
  type: string;
};

export type TypeFilter = {
  category: string;
  gender: string;
  color: string;
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
};
