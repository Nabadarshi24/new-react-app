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

export type TypeSimilarProduct = {
  _id: string;
  name: string;
  price: number;
  images: {
    url: string;
  }[];
};
