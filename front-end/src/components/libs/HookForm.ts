import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormProps
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

type TypeProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = {
  initialState: TFieldValues;
  schema: ObjectSchema<TFieldValues>;
}

export const useHookForm = <TFieldValues extends FieldValues = FieldValues>({
  initialState,
  schema,
  // restOptions
}: TypeProps<TFieldValues>) => {
  return useForm<TFieldValues, any, TFieldValues>({
    defaultValues: initialState as DefaultValues<TFieldValues>,
    resolver: yupResolver(schema, {
      abortEarly: false
    }),
    mode: "onChange",
    shouldUnregister: false,
    // ...restOptions
  });
};