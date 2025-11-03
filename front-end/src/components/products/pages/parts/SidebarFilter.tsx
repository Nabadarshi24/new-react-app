import { Category } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const SidebarFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Pink", "Purple", "Orange"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Silk", "Wool", "Denim", "Linen"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    console.log({ params });

  }, [searchParams])


  return (
    <div>SidebarFilter</div>
  );
};
