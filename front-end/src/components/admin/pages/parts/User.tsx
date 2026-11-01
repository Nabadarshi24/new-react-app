import React from 'react';
import { Form } from '../../../form/Form';
import { Input } from '../../../form/Input';
import { Select } from '../../../form/Select';
import { roleOptions } from '../../../helper/Helper';
import { SubmitButton } from '../../../form/SubmitButton';
import * as Yup from 'yup';
import { TypeUserCreate } from '../../types';
import { composeInitialState } from '../../../utils/Helpers';
import { useHookForm } from '../../../libs/HookForm';

const User = () => {

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

  const onSubmit = () => {
    // setUsers((prev) => [
    //   ...prev,
    //   {
    //     _id: Date.now().toString(),
    //     name: data.name,
    //     email: data.email,
    //     role: data.role,
    //   },
    // ]);
    // methods.reset();
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12 col-md-6">
          <Input
            name="name"
            label="Full Name"
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            name="email"
            label="Email Address"
            type="email"
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <Select
            name="role"
            label="Role"
            options={roleOptions}
          />
        </div>
        <div className="tw:w-full tw:sm:w-48">
          <SubmitButton />
        </div>
      </div>
    </Form>
  )
}

export default User