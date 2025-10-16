import {
  memo,
  useEffect,
  useState
} from 'react';
import {
  TextField,
  TextFieldProps,
  TextFieldVariants
} from '@mui/material';
import {
  Controller,
  useFormContext
} from 'react-hook-form';

type TypeProps = {
  name: string;
  type?: "text" | "password" | "number" | "email";
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, "type" | "variant">;

export const Input = memo(({
  name,
  type = "text",
  variant = "outlined",
  ...rest
}: TypeProps) => {
  // console.log("dddd");


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
          <TextField
            value={field.value}
            type={type}
            ref={field.ref}
            focused={isFocused}
            variant={variant}
            onChange={(e) => field.onChange(e)}
            onBlur={(e) => {
              field.onBlur();
              setIsFocused(false);
            }}
            onFocus={(e) => setIsFocused(true)}
            error={!!methods.formState.errors[name]}
            helperText={<>{methods.formState.errors[name]?.message}</>}
            {...rest}
          />
        )
      }}
    />
  )
}, (prevProps, nextProps) => {

  // console.log({ prevProps, nextProps })

  return (
    false
  );
});
