import { Close } from '@mui/icons-material';
import { CartContent } from './parts/CartContent';

type TypeProps = {
  isDrawerOpen: boolean;
  handleDrawerToggle: () => void;
};

export const CartDrawer = ({
  isDrawerOpen,
  handleDrawerToggle
}: TypeProps) => {
  return (
    <div className={`tw:fixed tw:top-0 tw:right-0 tw:w-3/4 tw:sm:w-1/2 tw:md:w-[30rem] tw:h-full tw:bg-white tw:shadow-lg tw:transform tw:transition-transform tw:duration-300 tw:flex tw:flex-col tw:z-50 ${isDrawerOpen ? "tw:translate-x-0" : "tw:translate-x-full"}`}>
      <div className="tw:flex tw:justify-end tw:p-4">
        <button
          className='tw:cursor-pointer'
          onClick={handleDrawerToggle}
        >
          <Close className='tw:text-gray-600' />
        </button>
      </div>

      <div className="tw:flex-grow tw:p-4 tw:overflow-y-auto">
        <div className="tw:flex tw:items-center tw:justify-between tw:p-4">
          <h2>Shopping Cart</h2>
        </div>
        <CartContent />
      </div>

      <div className="tw:sticky tw:bottom-0 tw:p-4">
        <button className='tw:w-full tw:bg-black tw:text-white tw:py-3 tw:rounded-lg tw:font-semibold tw:text-center tw:cursor-pointer tw:hover:bg-gray-800'>
          Checkout
        </button>
        <p className='tw:text-sm tw:text-gray-500 tw:mt-2 tw:text-center'>Shipping, taxes and discount calculated at checkout</p>
      </div>
    </div>
  );
};
