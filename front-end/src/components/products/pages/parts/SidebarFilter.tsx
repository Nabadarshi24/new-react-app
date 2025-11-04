import { Category } from '@mui/icons-material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { TypeFilter } from '../../types';

export const SidebarFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState<TypeFilter>({
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
  const navigate = useNavigate();

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Pink", "Purple", "Orange"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Silk", "Wool", "Denim", "Linen"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    // console.log({ params });

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 100
    });

    setPriceRange([0, parseInt(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLButtonElement>) => {
    const { name, value, checked, type } = event.target as HTMLInputElement;
    console.log({ name, value, checked, type });
    let newFilters: TypeFilter = { ...filters };

    if (type == "checkbox") {
      let newFilterValue = newFilters[name as keyof TypeFilter] as string[];
      if (checked) {
        newFilterValue = [...(newFilterValue as string[] || []), value];
        newFilters = { ...newFilters, [name]: newFilterValue };
      } else {
        newFilterValue = newFilterValue.filter((item) => item !== value);
        newFilters = { ...newFilters, [name]: newFilterValue };
      }
    } else {
      let newFilterValue = newFilters[name as keyof TypeFilter] as string;

      newFilterValue = value;
      newFilters = { ...newFilters, [name]: newFilterValue };
    }

    setFilters(newFilters);
    // console.log({ newFilters });
    const filteredNewFilters = Object.entries(newFilters).filter((x) => x[1].length > 0);
    // console.log({ X: Object.fromEntries(filteredNewFilters) });
    updateURLParams(Object.fromEntries(filteredNewFilters));
  };

  const updateURLParams = (newFilters: TypeFilter) => {
    const params = new URLSearchParams();
    // console.log({ params });

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key as keyof TypeFilter]) && (newFilters[key as keyof TypeFilter] as string[]).length > 0) {
        params.append(key, (newFilters[key as keyof TypeFilter] as string[]).join(","));
      } else {
        if (newFilters[key as keyof TypeFilter] as string !== "") {
          params.append(key, newFilters[key as keyof TypeFilter] as string);
        }
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    setPriceRange([0, parseInt(newPrice)]);

    const newFilters = { ...filters, minPrice: 0, maxPrice: parseInt(newPrice) };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="tw:p-4">
      <h3 className="tw:text-xl tw:font-medium tw:text-gray-800 tw:mb-4">Filters</h3>

      {/* Category */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Category</label>
        {
          categories.map((category) => (
            <div key={category} className="tw:flex tw:items-center tw:mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={handleFilterChange}
                className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
              />
              <span className="tw:text-gray-700">{category}</span>
            </div>
          ))
        }
      </div>

      {/* Gender */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Gender</label>
        {
          genders.map((gender) => (
            <div key={gender} className="tw:flex tw:items-center tw:mb-1">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={filters.gender === gender}
                onChange={handleFilterChange}
                className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
              />
              <span className="tw:text-gray-700">{gender}</span>
            </div>
          ))
        }
      </div>

      {/* Color */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Color</label>
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          {
            colors.map((color) => (
              <button
                key={color}
                name="color"
                value={color}
                onClick={handleFilterChange}
                className={`tw:w-8 tw:h-8 tw:rounded-full tw:border tw:border-gray-300 tw:cursor-pointer tw:transition tw:hover:scale-105 ${filters.color === color ? "tw:ring-2 tw:ring-blue-500" : ""}`}
                style={{ backgroundColor: color.toLowerCase() }}
              >

              </button>
            ))
          }
        </div>
      </div>

      {/* Size */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Size</label>
        {
          sizes.map((size) => (
            <div
              key={size}
              className="tw:flex tw:items-center tw:mb-1"
            >
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
              />
              <span className="tw:text-gray-700">{size}</span>
            </div>
          ))
        }
      </div>

      {/* Material */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Material</label>
        {
          materials.map((material) => (
            <div
              key={material}
              className="tw:flex tw:items-center tw:mb-1"
            >
              <input
                type="checkbox"
                name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
              />
              <span className="tw:text-gray-700">{material}</span>
            </div>
          ))
        }
      </div>

      {/* Brand */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Brand</label>
        {
          brands.map((brand) => (
            <div
              key={brand}
              className="tw:flex tw:items-center tw:mb-1"
            >
              <input
                type="checkbox"
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
              />
              <span className="tw:text-gray-700">{brand}</span>
            </div>
          ))
        }
      </div>

      {/* Price Range */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRange}
          className="tw:w-full tw:h-2 tw:bg-gray-300 tw:appearance-none tw:rounded-lg tw:cursor-pointer"
        />
        <div className="tw:flex tw:items-center tw:justify-between">
          <span className="tw:text-gray-700">$ {filters.minPrice}</span>
          <span className="tw:text-gray-700">$ {filters.maxPrice}</span>
        </div>
      </div>
    </div>
  );
};
