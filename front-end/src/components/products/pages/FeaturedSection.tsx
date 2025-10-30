// import React from 'react'

import { icons } from "../../utils/Helpers";

export const FeaturedSection = () => {
  return (
    <section className="tw:py-16 tw:px-4 tw:lg:px-0">
      <div className="tw:container tw:mx-auto tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-4 tw:items-center">
        <div className="tw:flex tw:flex-col tw:items-center">
          <div className="tw:p-4 tw:rounded-fulltw:mb-4">
            <icons.LocalMall />
          </div>
          <h4 className="tw:tracking-tighter tw:mb-2">FREE INTERNATIONAL SHIPPING</h4>
          <p className="tw:text-gray-600 tw:text-sm tw:tracking-tighter">On orders over $100.00</p>
        </div>

        <div className="tw:flex tw:flex-col tw:items-center">
          <div className="tw:p-4 tw:rounded-fulltw:mb-4">
            <icons.Autorenew />
          </div>
          <h4 className="tw:tracking-tighter tw:mb-2">45 DAYS RETURN</h4>
          <p className="tw:text-gray-600 tw:text-sm tw:tracking-tighter">Money back guarantee</p>
        </div>

        <div className="tw:flex tw:flex-col tw:items-center">
          <div className="tw:p-4 tw:rounded-fulltw:mb-4">
            <icons.CreditCard />
          </div>
          <h4 className="tw:tracking-tighter tw:mb-2">SECURE CHECKOUT</h4>
          <p className="tw:text-gray-600 tw:text-sm tw:tracking-tighter">100% secured checkout process</p>
        </div>
      </div>
    </section>
  );
};
