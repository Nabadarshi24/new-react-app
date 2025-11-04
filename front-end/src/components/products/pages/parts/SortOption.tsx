// import React from 'react'
import { useSearchParams } from 'react-router';

export const SortOption = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="tw:mb-4 tw:flex tw:items-center tw:justify-end">
      <select
        id="sort"
        value={searchParams.get("sortBy") || ""}
        className="tw:p-2 tw:border tw:border-gray-300 tw:rounded-md tw:focus:outline-none"
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};
