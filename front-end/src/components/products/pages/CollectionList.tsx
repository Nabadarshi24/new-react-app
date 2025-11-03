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

const CollectionList = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
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

      setProducts(fetchedProducts);
    }, 1000)
  }, []);

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

