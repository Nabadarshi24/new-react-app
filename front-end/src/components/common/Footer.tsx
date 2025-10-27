// import React from 'react'
import { Form } from '../form/Form';
import { Input } from '../form/Input';
import * as Yup from "yup";
import { composeInitialState, icons } from '../utils/Helpers';
import { useHookForm } from '../libs/HookForm';
import { Link } from 'react-router';

export const Footer = () => {

  const { initialState, names, labels } = composeInitialState({
    email: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string().label(labels.email)
  })

  const methods = useHookForm({
    initialState,
    schema
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <footer className='tw:border-t tw:py-12'>
      <div className="tw:container tw:mx-auto tw:grid tw:grid-cols-1 tw:md:grid-cols-4 tw:gap-8 tw:px-4 tw:lg:px-0">
        <div>
          <h3 className='tw:text-lg tw:font-semibold tw:mb-4'>Newsletter</h3>
          <p className='tw:text-gray-500 tw:mb-4'>Be the first to hear about new products, exclusive events, and online offers.</p>
          <p>Sign up and get 10% off your first purchase.</p>

          <Form
            onSubmit={onSubmit}
            methods={methods}
            className='tw:flex tw:items-start'
          >
            <Input
              name="email"
              label="Email"
              placeholder='Enter your email'
            // className='tw:!rounded-r-none'
            />
            <button
              type="submit"
              className='tw:bg-black tw:text-white tw:py-16px tw:px-6 tw:rounded-r-md tw:hover:bg-gray-600'
            >
              Subscribe
            </button>
          </Form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className='tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-4'>Shop</h3>
          <ul className='tw:space-y-2 tw:text-gray-600'>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Men's Top Wear</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Women's Top Wear</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Men's Bottom Wear</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Women's Bottom Wear</Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className='tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-4'>Support</h3>
          <ul className='tw:space-y-2 tw:text-gray-600'>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>About Us</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Contact Us</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>FAQs</Link>
            </li>
            <li>
              <Link to="#" className='tw:hover:text-gray-500 tw:transition-colors'>Features</Link>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className='tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-4'>Follow Us</h3>
          <div className="tw:flex tw:items-center tw:space-x-4 tw:mb-6">
            <a
              href="https://www.facebook.com/"
              target="_blank" rel="noopener noreferrer"
            >
              <icons.Facebook />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank" rel="noopener noreferrer"
            >
              <icons.Instagram />
            </a>
            <a
              href="https://www.x.com/"
              target="_blank" rel="noopener noreferrer"
            >
              <icons.X />
            </a>
          </div>
          <p className='tw:text-gray-500'>Call Us</p>
          <p>+123 456 7890</p>
        </div>
      </div>

      {/* Footer Bottom */}

      <div className="tw:container tw:mx-auto tw:mt-12 tw:px-4 tw:lg-px-0 tw:border-t tw:border-gray-200 tw:pt-6">
        <p className="tw:text-center tw:text-gray-500 tw:text-sm tw:tracking-tighter">@ 2025, Nabadarshi. All rights reserved.</p>
      </div>
    </footer>
  );
};
