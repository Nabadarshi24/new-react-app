export type TypeNewArrival = {
  _id: string;
  name: string;
  price: number;
  images: {
    url: string;
    altText: string;
  }[];
};