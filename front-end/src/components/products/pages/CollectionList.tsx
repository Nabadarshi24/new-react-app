import {
  ComponentType,
  useEffect,
  useRef,
  useState
} from 'react';
import { icons } from '../../utils/Helpers';
import { SidebarFilter } from './parts/SidebarFilter';
import { ProductGrid } from './parts/ProductGrid';
import { SortOption } from './parts/SortOption';
import { TypeProduct } from '../types';
import { getAllProducts } from '../api';
import { useSearchParams } from 'react-router';

const CollectionList = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sidebarRef = useRef(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onMount = async (params?: Record<string, string>) => {
    // TODO: Fetch products from API
    try {
      const response = await getAllProducts(params);
      // console.log({ response });

      if (response.success && response.data) {
        setProducts(response.data.items);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    // console.log({ searchParams: params });

    void onMount(params);
  }, [searchParams]);

  return (
    <div className="tw:flex tw:flex-col tw:lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        className="tw:lg:hidden tw:border tw:p-2 tw:flex tw:justify-center tw:items-center"
        onClick={handleToggleSidebar}
      >
        <icons.FilterListAlt className="tw:mr-2" /> Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "tw:translate-x-0" : "tw:-translate-x-full"} tw:fixed tw:left-0 tw:inset-y-0 tw:w-64 tw:h-full tw:bg-white tw:overflow-y-auto tw:z-50 tw:transition-transform tw:duration-300 tw:lg:static tw:lg:translate-x-0`}
      >
        <SidebarFilter />
      </div>
      <div className="tw:flex-grow tw:p-4">
        <h2 className="tw:text-2xl tw:uppercase tw:mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOption />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionList as ComponentType;

