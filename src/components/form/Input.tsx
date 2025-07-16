import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type TypeProps = {
  name: string;
  type?: "text" | "password" | "number" | "email";
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, "type" | "variant">;

export const Input = ({
  name,
  type = "text",
  variant = "outlined",
  ...rest
}: TypeProps) => {

  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        console.log({ field })
        return (
          <TextField
            value={field.value}
            type={type}
            variant={variant}
            error={!!methods.formState.errors[name]}
            helperText={<>{methods.formState.errors[name]?.message}</>}
            {...rest}
          />
        )
      }}
    />
  )
};
