import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';
import { CartContent } from './parts/CartContent';
import { useAccountStore } from '../../stores/GlobalStore';
import { getCartDetails } from '../api';
import { TypeCart } from '../types';
import { showErrorMessage, setLocalStorageItem, removeLocalStorageItem } from '../../helper/Helper';

type TypeProps = {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
};

export const CartDrawer = ({
  isDrawerOpen,
  handleDrawerToggle
}: TypeProps) => {
  const cartId = localStorage.getItem('cartId');

  const [cartDetails, setcartDetails] = useState<TypeCart>();

  const navigate = useNavigate();
  const setLoading = useAccountStore((store) => store.setIsLoading);

  const loadCartDetails = useCallback(async (cartId: string) => {
    // TODO: Load cart details from API
    try {
      setLoading(true);

      const response = await getCartDetails(cartId as string);
      
      // debugger
      if (response?.data && response.success) {
        setcartDetails(response.data);
        setLocalStorageItem("cartItemsCount", response.data.products.length.toString());
        // localStorage.setItem("cartItemsCount", response.data.products.length.toString());
        // window.dispatchEvent(new Event("storage"));
      } else {
        // debugger
        removeLocalStorageItem("cartId");
        removeLocalStorageItem("cartItemsCount");
        setcartDetails(undefined);
        throw new Error(response?.errorMessage as string);
        // showErrorMessage(response?.errorMessage as string);
      }
    } catch (error: any) {
      console.log({ error });
      showErrorMessage(error.message)
    } finally {
      setLoading(false);
    }
  }, [cartDetails]);

  useEffect(() => {
    if (isDrawerOpen && cartId) {
      loadCartDetails(cartId)
    }
  }, [isDrawerOpen])

  console.log({ cartDetails })

  return (
    <div className={`tw:fixed tw:top-0 tw:right-0 tw:w-3/4 tw:sm:w-1/2 tw:md:w-[30rem] tw:h-full tw:bg-white tw:shadow-lg tw:transform tw:transition-transform tw:duration-300 tw:flex tw:flex-col tw:z-50 ${isDrawerOpen ? "tw:translate-x-0" : "tw:translate-x-full"}`}>
      <div className="tw:flex tw:items-center tw:justify-between tw:p-4">
        <div className="tw:flex tw:items-center tw:justify-between">
          <h1 className='tw:text-2xl tw:font-semibold tw:uppercase'>Shopping Cart</h1>
        </div>
        <button
          className='tw:cursor-pointer'
          onClick={handleDrawerToggle}
        >
          <Close className='tw:text-gray-600' />
        </button>
      </div>

      <div className="tw:flex-grow tw:p-4 tw:overflow-y-auto">

        {
          (cartDetails?.products && cartDetails.products.length > 0)
            ? <CartContent
              products={cartDetails.products}
              doOnDelete={() => {
                if (cartId) {
                  loadCartDetails(cartId);
                }
              }}
            />
            : <div className="tw:text-center tw:py-8">
              <p className="tw:text-gray-500">Your cart is empty!</p>
            </div>
        }
      </div>

      <div className="tw:sticky tw:bottom-0 tw:p-4">
        <button
          className='tw:w-full tw:bg-black tw:text-white tw:py-3 tw:rounded-lg tw:font-semibold tw:text-center tw:cursor-pointer tw:hover:bg-gray-800'
          onClick={() => {
            // TODO: Navigate to checkout page
            navigate('/checkout');
            handleDrawerToggle();
          }}
        >
          Checkout
        </button>
        <p className='tw:text-sm tw:text-gray-500 tw:mt-2 tw:text-center'>Shipping, taxes and discount calculated at checkout</p>
      </div>
    </div>
  );
};
