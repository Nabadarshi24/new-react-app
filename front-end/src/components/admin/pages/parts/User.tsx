// import React from 'react';
import { Form } from '../../../form/Form';
import { Input } from '../../../form/Input';
import { Select } from '../../../form/Select';
import { roleOptions, showErrorMessage, showSuccessMessage } from '../../../helper/Helper';
import { SubmitButton } from '../../../form/SubmitButton';
import * as Yup from 'yup';
import { TypeUserCreate } from '../../types';
import { composeInitialState } from '../../../utils/Helpers';
import { useHookForm } from '../../../libs/HookForm';
import { useAccountStore } from '../../../stores/GlobalStore';
import { createUser } from '../../api';

type TypeProps = {
  doOnSubmit: () => void;
}

const User = ({ doOnSubmit }: TypeProps) => {

  const setLoading = useAccountStore(store => store.setIsLoading);

  const { initialState, names, labels } = composeInitialState<TypeUserCreate>({
    name: "",
    email: "",
    role: ""
  });

  const schema = Yup.object<TypeUserCreate>().shape({
    name: Yup.string().required().label(labels.name),
    email: Yup.string().email().required().label(labels.email),
    role: Yup.string().required().label(labels.role)
  });

  const methods = useHookForm<TypeUserCreate>({
    initialState,
    schema
  });

  const onSubmit = async () => {
    try {
      setLoading(true);

      const apiPayload = methods.getValues();

      const response = await createUser(apiPayload);

      if(response?.success) {
        showSuccessMessage(response.successMessage);
        doOnSubmit();
      } else {
        throw new Error(response?.errorMessage || 'Failed to create user');
      }

    } catch (error) {
      console.error(error);
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12 col-md-6">
          <Input
            name={names.name}
            label={labels.name}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            name={names.email}
            label={labels.email}
            type="email"
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <Select
            name={names.role}
            label={labels.role}
            options={roleOptions}
            className='tw:!mb-20px'
          />
        </div>
        <div className="col-12">
          <SubmitButton className='tw:text-right' />
        </div>
      </div>
    </Form>
  )
}

export default User