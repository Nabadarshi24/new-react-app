import { useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router';
import * as Yup from "yup";
import { TypeSignUp, TypeUserData } from '../types';
import { Form } from '../../form/Form';
import { Input } from '../../form/Input';
import { SubmitButton } from '../../form/SubmitButton';
import { composeInitialState, createUser } from '../../utils/Helpers';
import { useHookForm } from '../../libs/HookForm';

export const SignUp = () => {

  // const navigate = useNavigate();

  // const [userData, setUserData] = useState<TypeUserData[]>();
  // const [password, setPassword] = useState("");

  const [initialState, names, labels] = composeInitialState<TypeSignUp>({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: ""
  });

  const schema = Yup.object<TypeSignUp>().shape({
    email: Yup.string().required().label(labels.email),
    firstName: Yup.string().required().label(labels.firstName),
    lastName: Yup.string().required().label(labels.lastName),
    password: Yup.string().required().label(labels.password),
    role: Yup.string().label(labels.role)
  })

  const methods = useHookForm<TypeSignUp>({
    initialState,
    schema
  });

  const onSubmit = async () => {
    debugger;
    try {
      const data = methods.getValues();
      console.log({ data });

      // const resp = createUser(data);

      // console.log({resp});

    } catch (error) {

    }
  };

  return (
    <div className="public-card">
      <div className='login-container'>
        <h1>Sign Up</h1>

        <Form
          methods={methods}
          onSubmit={onSubmit}
        >
          <div className="row">
            <div className="col-12">
              <Input
                name={names.firstName}
                label={labels.firstName}
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.lastName}
                label={labels.lastName}
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.email}
                label={labels.email}
                type='email'
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.password}
                label={labels.password}
                type='password'
                required
              />
            </div>
          </div>

          <SubmitButton
            label="Sign Up"
            variant="contained"
          />
        </Form>

        <div className="card-footer">
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

