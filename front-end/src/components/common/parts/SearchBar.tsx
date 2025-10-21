import { SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';

export const SearchBar = () => {
  const [searchProducts, setSearchProducts] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {
        isOpen ?
          <div>
            <input type="text" placeholder='Search products' value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)} />
          </div>
          : <button onClick={() => setIsOpen(!isOpen)}>
            <SearchOutlined />
          </button>
      }
    </>
  );
};
