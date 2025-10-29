import { ComponentType } from 'react'
import { Hero } from './parts/Hero';
import { GenderCollection } from './parts/GenderCollection';
import { NewArrivals } from './parts/NewArrivals';
import { ProductDetails } from '../../products/pages/ProductDetails';

export const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className='tw:text-3xl tw:text-center tw:font-bold tw:mb-4'>Best Seller</h2>
      <ProductDetails />
    </>
  );
};

export default Home as ComponentType;

