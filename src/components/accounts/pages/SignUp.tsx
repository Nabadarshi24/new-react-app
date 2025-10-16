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
import { Select, TypeDropdownOptions } from '../../form/Select';
import axios from 'axios';

export const SignUp = () => {

  const navigate = useNavigate();

  // const [userData, setUserData] = useState<TypeUserData[]>();
  // const [password, setPassword] = useState("");

  const roles: TypeDropdownOptions[] = [
    {
      text: "Admin",
      value: "admin",
      isDisabled: false
    },
    {
      text: "User",
      value: "user",
      isDisabled: false
    }
  ];

  const { initialState, names, labels } = composeInitialState<TypeSignUp>({
    email: "",
    firstName: "",
    lastName: "",
    userRole: "",
    password: ""
  });

  const schema = Yup.object<TypeSignUp>().shape({
    email: Yup.string().email().required().label(labels.email),
    firstName: Yup.string().required().label(labels.firstName),
    lastName: Yup.string().required().label(labels.lastName),
    password: Yup.string().required().label(labels.password),
    userRole: Yup.string().required().label(labels.userRole)
  })

  const methods = useHookForm<TypeSignUp>({
    initialState,
    schema
  });

  const onSubmit = async () => {
    try {
      const data = methods.getValues();
      console.log({ data });

      // const response = createUser(data);
      const response = await axios.post("http://localhost:3000/api/sign-up", data);

      console.log({ response });

      // if (response.success && response.message) {
      //   window.alert(response.message);

      //   navigate("/login");
      // } else {
      //   window.alert(response.message);
      // }

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
            <div className="col-12">
              <Select
                name={names.userRole}
                label={labels.userRole}
                options={roles}
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

