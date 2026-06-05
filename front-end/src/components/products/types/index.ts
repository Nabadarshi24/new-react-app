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

export type TypeProductVariant = {
  id: string;
  productId: string;
  // variantId: string;
  sizeAspectId: string;
  colorAspectId: string;
  colorAspect: {
    id: string;
    label: string;
    value: string;
    type: string;
  };
  sizeAspect: {
    id: string;
    label: string;
    value: string;
    type: string;
  };
  countInStock: number;
  sku: string;
  price: number;
  discountPrice?: number;
};

export type TypeProduct = {
  _id: string;
  productName: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  // price: number;
  // discountPrice: number;
  countInStock: number;
  // sku: string;
  category: string;
  brand: string;
  // sizes: string[];
  // colors: string[];
  collections: string;
  materialAspectId: string;
  materialAspect: {
    id: string;
    label: string;
    value: string;
    type: string;
  };
  defaultVariantId: string;
  defaultVariant: TypeProductVariant;
  productVariants: TypeProductVariant[];
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
  id: string;
  value: string;
  label: string;
  type: string;
};

export type TypeFilter = {
  category: string;
  gender: string;
  color: string[];
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
};
