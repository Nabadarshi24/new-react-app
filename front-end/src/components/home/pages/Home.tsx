import { ComponentType } from 'react'
import { Hero } from './parts/Hero';
import { GenderCollection } from './parts/GenderCollection';
import { NewArrivals } from './parts/NewArrivals';
import { ProductDetails } from '../../products/pages/ProductDetails';
import { ProductGrid } from '../../products/pages/parts/ProductGrid';
import { TypeSimilarProduct } from '../../products/types';
import { FeaturedCollection } from '../../products/pages/FeaturedCollection';
import { FeaturedSection } from '../../products/pages/FeaturedSection';

const placeHolderProducts: TypeSimilarProduct[] = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3" }]
  },
  {
    _id: "2",
    name: "Product 2",
    price: 200,
    images: [{ url: "https://picsum.photos/500/500?random=4" }]
  },
  {
    _id: "3",
    name: "Product 3",
    price: 300,
    images: [{ url: "https://picsum.photos/500/500?random=5" }]
  },
  {
    _id: "4",
    name: "Product 4",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=6" }]
  },
  {
    _id: "5",
    name: "Product 5",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=7" }]
  },
  {
    _id: "6",
    name: "Product 6",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=8" }]
  },
  {
    _id: "7",
    name: "Product 7",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=9" }]
  },
  {
    _id: "8",
    name: "Product 8",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=10" }]
  }
];

export const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className='tw:text-3xl tw:text-center tw:font-bold tw:mb-4'>Best Seller</h2>
      <ProductDetails />

      <div className="tw:container tw:mx-auto">
        <h2 className='tw:text-3xl tw:text-center tw:font-bold tw:mb-4'>Top Wears For Women</h2>
        <ProductGrid products={placeHolderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturedSection />
    </>
  );
};

export default Home as ComponentType;

