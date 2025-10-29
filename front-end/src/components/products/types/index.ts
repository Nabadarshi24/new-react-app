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