import { Link } from 'react-router';

export const Hero = () => {
  return (
    <section className='tw:relative'>
      <img
        src="/images/rabbit_hero.webp"
        alt="Hero image"
        className='tw:w-full tw:h-[400px] tw:md:h-[600px] tw:lg:h-[750px] tw:object-cover'
      />
      <div className="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:bg-black/5">
        <div className="tw:text-center tw:text-white tw:p-6">
          <h1 className='tw:text-4xl tw:md:text-9xl tw:font-bold tw:tracking-tighter tw:uppercase tw:mb-4'>
            Vacation <br /> Ready
          </h1>
          <p className='tw:text-sm tw:tracking-tighter tw:md:text-lg tw:mb-6'>
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="#"
            className='tw:text-gray-950 tw:bg-white tw:px-6 tw:py-2 tw:rounded-sm tw:text-lg'
          >
            Shop Now
          </Link>
        </div>

      </div>
    </section>
  );
};
