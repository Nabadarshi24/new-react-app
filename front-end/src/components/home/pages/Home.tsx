import { ComponentType } from 'react'
import { Hero } from './parts/Hero';
import { GenderCollection } from './parts/GenderCollection';
import { NewArrivals } from './parts/NewArrivals';

export const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArrivals />
    </>
  );
};

export default Home as ComponentType;

