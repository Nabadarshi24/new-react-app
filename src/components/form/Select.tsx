import {
  memo,
  ReactNode,
  useEffect,
  useState
} from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  SelectProps,
  Select as MuiSelect,
  SelectVariants,
} from '@mui/material';
import {
  Controller,
  useFormContext
} from 'react-hook-form';

export type TypeDropdownOptions = {
  text: string;
  value: string;
  isDisabled?: boolean;
} & Record<string, any>;

type TypeSelectProps = {
  name: string;
  options: TypeDropdownOptions[];
  variant?: SelectVariants;
  errorMessage?: ReactNode;
  placeholder?: string | null;
} & Omit<SelectProps, "placeholder" | "variant">;

export const Select = memo(({
  name,
  label,
  variant = "outlined",
  errorMessage,
  placeholder,
  options,
  ...rest
}: TypeSelectProps) => {

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const methods = useFormContext();

  // useEffect(() => {
  //   setIsFocused(true)
  // }, []);

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        return (
          <FormControl>
            <InputLabel id={`${Math.random()}-label`}>{(!isFocused && placeholder) ? placeholder : label}</InputLabel>

            <MuiSelect
              name={name}
              value={field.value}
              label={label}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => field.onChange(e)}
              labelId={`${Math.random()}-label`}
              {...rest}
            >
              {
                options.map((option, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={option.value}
                    >
                      {option.text}
                    </MenuItem>
                  )
                })
              }
            </MuiSelect>

            {
              errorMessage &&
              <FormHelperText>{errorMessage}</FormHelperText>
            }
          </FormControl>
        )
      }}
    />
  )
}, (prevProps, nextProps) => {

  console.log({ prevProps, nextProps })

  return (
    false
  );
});
