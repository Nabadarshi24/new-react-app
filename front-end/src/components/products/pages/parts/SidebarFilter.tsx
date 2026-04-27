import { Category } from '@mui/icons-material';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { TypeFilter, TypeFilterOption } from '../../types';
import { getAllProducts, getFilterOptions } from '../../api';
import axios from 'axios';

export const SidebarFilter = () => {
  // const [priceRange, setPriceRange] = useState([0, 100]);
  const [filterOptions, setFilterOptions] = useState<TypeFilterOption[]>([]);
  const [filters, setFilters] = useState<TypeFilter>({
    category: "",
    gender: "",
    color: [],
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLButtonElement>) => {
  const handleFilterChange = async (event?: React.ChangeEvent<HTMLInputElement>, currentFilters?: TypeFilter) => {
    const { name, value, checked, type } = event?.currentTarget || {};
    console.log({ name, value, checked, type });
    // debugger

    let newFilters: TypeFilter = { ...(currentFilters || filters) };

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

    // debugger
    setFilters(newFilters);
    // console.log({ newFilters });
    // const filteredNewFilters = Object.entries(newFilters);
    // console.log({ X: Object.fromEntries(filteredNewFilters) });
    // updateURLParams(Object.fromEntries(filteredNewFilters) as TypeFilter);
    updateURLSearchParams(newFilters);
  };

  const updateURLSearchParams = async (newFilters: TypeFilter) => {
    const params = new URLSearchParams();
    // console.log({ params });

    Object.keys(newFilters).forEach((key) => {
      const v = newFilters[key as keyof TypeFilter];
      // debugger

      if (Array.isArray(v)) {
        if (v.length > 0) {

          params.append(key, v.join(","));
        }

        return;
      }

      if (typeof v === "string" && v !== "") {
        params.append(key, v as string);

        return;
      }

      if (typeof v === "number" && (v > 0 && v < filters.maxPrice)) {
        params.append(key, v.toString());
        return;
      }
    });

    setSearchParams(params);

    // navigate(`?${params.toString().replace(/%2C/g, ',')}`);
    // console.log({ params: params.toString() })
    // const response = await getAllProducts(Object.fromEntries(params));
    // console.log({ response });
  };

  const handlePriceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    // setPriceRange([parseInt(newPrice), 100]);

    const newFilters = { ...filters, minPrice: parseInt(newPrice), maxPrice: 100 };
    setFilters(newFilters);
    // updateURLParams(newFilters);
  };

  const handleRelease = (event: React.MouseEvent<HTMLInputElement>) => {
    const newPrice = event.currentTarget.value;

    const newFilters = { ...filters, minPrice: parseInt(newPrice), maxPrice: 100 };
    // setFilters(newFilters);
    updateURLSearchParams(newFilters);
  };

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams);
  //   console.log({ params });

  //   setFilters({
  //     category: params.category || "",
  //     gender: params.gender || "",
  //     color: params.color || "",
  //     size: params.size ? params.size.split(",") : [],
  //     material: params.material ? params.material.split(",") : [],
  //     brand: params.brand ? params.brand.split(",") : [],
  //     minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
  //     maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 100
  //   });

  //   // debugger
  //   // if (Object.keys(params).length > 0) {
  //     updateURLSearchParams(params as unknown as TypeFilter);
  //   // }
  //   // setPriceRange([0, parseInt(params.maxPrice) || 100]);
  // }, [searchParams]);

  const onMount = async () => {
    try {

      const response = await getFilterOptions();
      // console.log({ response });

      if (response.success && response.data) {
        setFilterOptions(response.data);
      }

      const params = Object.fromEntries(searchParams);
      console.log({ params });


      const currentFilters = {
        category: params.category || "",
        gender: params.gender || "",
        color: params.color ? params.color.split(",") : [],
        size: params.size ? params.size.split(",") : [],
        material: params.material ? params.material.split(",") : [],
        brand: params.brand ? params.brand.split(",") : [],
        minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
        maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 100
      };

      // setFilters(currentFilters);

      await handleFilterChange(undefined, currentFilters);

    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    void onMount();
  }, []);

  return (
    <div className="tw:p-4">
      <h3 className="tw:text-xl tw:font-medium tw:text-gray-800 tw:mb-4">Filters</h3>

      {/* Category */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Category</label>
        {
          filterOptions.map((option) => {
            if (option.type === 'category') {
              return <div key={option.value} className="tw:flex tw:items-center tw:mb-1">
                <input
                  type="radio"
                  name="category"
                  value={option.value}
                  checked={filters.category === option.value}
                  onChange={handleFilterChange}
                  className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
                />
                <span className="tw:text-gray-700">{option.label}</span>
              </div>
            }
          })
        }
      </div>

      {/* Gender */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Gender</label>
        {
          filterOptions.map((option) => {
            if (option.type === 'gender') {
              return <div key={option.value} className="tw:flex tw:items-center tw:mb-1">
                <input
                  type="radio"
                  name={option.type}
                  value={option.value}
                  checked={filters.gender === option.value}
                  onChange={handleFilterChange}
                  className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
                />
                <span className="tw:text-gray-700">{option.label}</span>
              </div>
            }
          })
        }
      </div>

      {/* Color */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Color</label>
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          {
            filterOptions.map((option) => {
              if (option.type === 'color') {
                return <input
                  type='checkbox'
                  key={option.value}
                  name="color"
                  value={option.value}
                  checked={filters.color.includes(option.value)}
                  onChange={handleFilterChange}
                  className={`color-checkbox tw:transition tw:hover:scale-105 ${filters.color.includes(option.value) ? "tw:ring-2 tw:ring-blue-500" : ""}`}
                  style={{ backgroundColor: option.value.toLowerCase() }}
                />
              }
            })
          }
        </div>
      </div>

      {/* Size */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Size</label>
        {
          filterOptions.map((option) => {
            if (option.type === 'size') {
              return <div
                key={option.value}
                className="tw:flex tw:items-center tw:mb-1"
              >
                <input
                  type="checkbox"
                  name={option.type}
                  value={option.value}
                  checked={filters.size.includes(option.value)}
                  onChange={handleFilterChange}
                  className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
                />
                <span className="tw:text-gray-700">{option.label}</span>
              </div>
            }
          })
        }
      </div>

      {/* Material */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Material</label>
        {
          filterOptions.map((option) => {
            if (option.type === "material") {
              return <div
                key={option.value}
                className="tw:flex tw:items-center tw:mb-1"
              >
                <input
                  type="checkbox"
                  name="material"
                  value={option.id}
                  checked={filters.material.includes(option.id)}
                  onChange={handleFilterChange}
                  className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
                />
                <span className="tw:text-gray-700">{option.label}</span>
              </div>
            }
          })
        }
      </div>

      {/* Brand */}
      <div className="tw:mb-6">
        <label className="tw:block tw:font-medium tw:text-gray-600 tw:mb-2">Brand</label>
        {
          filterOptions.map((option) => {
            if (option.type === "brand") {
              return <div
                key={option.value}
                className="tw:flex tw:items-center tw:mb-1"
              >
                <input
                  type="checkbox"
                  name="brand"
                  value={option.value}
                  checked={filters.brand.includes(option.value)}
                  onChange={handleFilterChange}
                  className="tw:mr-2 tw:h-4 tw:w-4 tw:text-blue-500 tw:focus:ring-blue-400 tw:border-gray-300"
                />
                <span className="tw:text-gray-700">{option.label}</span>
              </div>
            }
          })
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
          value={filters.minPrice}
          onChange={handlePriceRange}
          onMouseUp={handleRelease}
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

