import {
  CheckboxProps,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { Checkbox as MuiCheckbox } from '@mui/material';
import {
  Controller,
  useFormContext
} from 'react-hook-form';

export type TypeCheckboxProps = {
  name: string;
  label: string;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
} & Omit<CheckboxProps, "disabled" | "onChange" | "onBlur" | "labelPlacement">;

export const Checkbox = ({
  name,
  label,
  disabled,
  labelPlacement = "end",
  onChange,
  onBlur,
  ...rest
}: TypeCheckboxProps) => {

  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        return (
          <span className="checkbox-container">
            <FormControlLabel
              control={
                <MuiCheckbox
                  checked={field.value}
                  disabled={disabled}
                  onChange={(e) => {
                    onChange?.(e);
                    field.onChange(e)
                  }}
                  // icon={<span className="checkbox-icon"></span>}
                  // checkedIcon={<span className="checkbox-checked-icon"></span>}
                  // onBlur={(e) => {
                  //   onBlur?.(e);
                  //   field.onBlur()
                  // }}
                  ref={field.ref}
                  {...rest}
                />
              }
              label={label}
              labelPlacement={labelPlacement}
              {...field}
            />
            <FormHelperText>{methods.getFieldState(name).error?.message}</FormHelperText>
          </span>
        )
      }}
    />
  );
};

