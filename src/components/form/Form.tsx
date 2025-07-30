import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn
} from 'react-hook-form';

type FormProviderProps<TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues = TFieldValues> = {
  methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TTransformedValues>;
};

export const Form = <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues = TFieldValues>({
  methods,
  onSubmit,
  children
}: FormProviderProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormProvider {...methods}>
      <form
        className='login-form'
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};
