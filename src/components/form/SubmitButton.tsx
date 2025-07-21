import { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router';
// import React = require('react');

type TypeButtonProps = {
  // children: ReactNode;
  label?: string;
  className?: string;
  to?: string;
  ref?: React.Ref<any>;
  variant?: 'text' | 'outlined' | 'contained';
} & Omit<ButtonProps, "children" | "className" | "to" | "ref" | "component">;

// type TypeProps = TypeButtonProps & {
//   methods: UseFormReturn;
// }

export const SubmitButton = ({
  // children,
  label = "Submit",
  className,
  // to,
  ref,
  variant = "outlined",
  onClick,
  ...rest
}: TypeButtonProps) => {
  const methods = useFormContext();

  return (
    <Button
      type="submit"
      onClick={(e) => {
        console.log({
          values: methods.getValues(),
          errors: methods.formState.errors
        });
        onClick?.(e);
      }}
      ref={ref}
      {...rest}
    >
      {label}
    </Button>
  );
};
