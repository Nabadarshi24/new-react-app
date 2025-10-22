import { Close, SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Form } from '../../form/Form';
import { composeInitialState } from '../../utils/Helpers';
import * as Yup from "yup";
import { useHookForm } from '../../libs/HookForm';
import { Input } from '../../form/Input';

type TypeSearchProducts = {
  products: string;
}

export const SearchBar = () => {
  // const [searchProducts, setSearchProducts] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { initialState, names, labels } = composeInitialState({
    products: ["", "Search products"]
  });

  const schema = Yup.object<TypeSearchProducts>().shape({
    products: Yup.string().label(labels.products)
  })

  const methods = useHookForm<TypeSearchProducts>({
    initialState,
    schema
  });

  const onSubmit = (data: TypeSearchProducts) => {
    console.log({ data });
    setIsOpen(false);
  };

  return (
    <div className={`tw:flex tw:items-center tw:justify-center tw:transition-all tw:w-full tw:duration-300 ${isOpen ? "tw:absolute tw:bg-white tw:top-0 tw:left-0 tw:z-50" : "tw:w-auto"}`}>
      {
        isOpen ?
          <Form
            onSubmit={onSubmit}
            methods={methods}
            className="tw:flex tw:items-center tw:justify-center"
          >
            <div className="tw:relative tw:w-1/2">
              <Input
                name={names.products}
                label={labels.products}
              />
              <button
                type='submit'
                className="tw:cursor-pointer tw:absolute tw:top-[28px] tw:right-2 tw:transform tw:-translate-y-1/2"
              >
                <SearchOutlined />
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="tw:cursor-pointer tw:absolute tw:top-[58px] tw:right-[20px] tw:transform tw:-translate-y-1/2"
            >
              <Close />
            </button>
          </Form>
          : <button
            onClick={() => setIsOpen(!isOpen)}
            className="tw:cursor-pointer"
          >
            <SearchOutlined />
          </button>
      }
    </div>
  );
};
