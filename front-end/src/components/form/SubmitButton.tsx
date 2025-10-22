import { ReactNode, useEffect } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router';
// import React = require('react');

type TypeButtonProps = {
  // children: ReactNode;
  label?: string;
  className?: string;
  children?: ReactNode;
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
  children,
  // to,
  ref,
  variant = "outlined",
  onClick,
  ...rest
}: TypeButtonProps) => {

  const methods = useFormContext();
  const { formState: { errors } } = methods;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log({ formError: errors });
    }
  }, [errors]);

  return (
    <Button
      type="submit"
      className={className}
      onClick={async (e) => {
        // const rep = await methods.trigger();

        // methods.formState.errors
        // console.log({ rep, errors: methods.formState.errors });
        console.log({
          values: methods.getValues(),
          // errors: methods.formState.errors
          // errors: methods.control._formState.errors
        });
        onClick?.(e);
      }}
      ref={ref}
      {...rest}
    >
      {children || label}
    </Button>
  );
};
