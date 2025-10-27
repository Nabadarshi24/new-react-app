import { ContentHeader } from '../../elements/ContentHeader';
import { Form } from '../../form/Form';
import { composeInitialState } from '../../utils/Helpers';
import * as Yup from "yup";
import { useHookForm } from '../../libs/HookForm';
import { TypeLoginUserData, TypeUserProfile } from '../types';
import { Input } from '../../form/Input';
import { SubmitButton } from '../../form/SubmitButton';
import { ComponentType, useCallback, useEffect } from 'react';
import { updateUser } from '../api';
import { Checkbox } from '../../form/Checkbox';

const Profile = () => {

  const { initialState, names, labels } = composeInitialState<TypeUserProfile>({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    userRole: "",
    // password: "",
    isVerified: false,
    isDeleted: false
  });

  const schema = Yup.object<TypeUserProfile>().shape({
    email: Yup.string().email().required().label(labels.email),
    userName: Yup.string().required().label(labels.userName),
    firstName: Yup.string().required().label(labels.firstName),
    lastName: Yup.string().required().label(labels.lastName),
    // password: Yup.string().required().label(labels.password),
    userRole: Yup.string().required().label(labels.userRole),
    isVerified: Yup.boolean().required().label(labels.isVerified),
    isDeleted: Yup.boolean().required().label(labels.isDeleted)
  })

  const methods = useHookForm<TypeUserProfile>({
    initialState,
    schema
  });

  const watchFirstName = methods.watch("firstName");
  const watchLastName = methods.watch("lastName");

  const onMount = useCallback(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user: TypeLoginUserData = JSON.parse(loggedUser);
      methods.setValue(names.userName, user.firstName.toLocaleLowerCase() + "." + user.lastName.toLocaleLowerCase());
      methods.setValue(names.firstName, user.firstName);
      methods.setValue(names.lastName, user.lastName);
      methods.setValue(names.email, user.email);
      methods.setValue(names.userRole, user.roleLabel);
      methods.setValue(names.isVerified, user.isVerified);
      methods.setValue(names.isDeleted, user.isDeleted);
    }
  }, []);

  const onSubmit = async () => {
    console.log("YYYY")
    try {
      const formData = methods.getValues();
      const response = updateUser(formData);

      if (response.success && response.message) {
        window.alert(response.message);
        onMount();
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <>
      <ContentHeader title="Profile" />

      <div className="content-container">
        <Form
          onSubmit={onSubmit}
          methods={methods}
        >
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name={names.userRole}
                label={labels.userRole}
                disabled
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name={names.userName}
                label={labels.userName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name={names.firstName}
                label={labels.firstName}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name={names.lastName}
                label={labels.lastName}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name={names.email}
                label={labels.email}
                type="email"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Checkbox
                name={names.isVerified}
                label={labels.isVerified}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Checkbox
                name={names.isDeleted}
                label={labels.isDeleted}
              />
            </div>
          </div>

          <div className="button-group-container">
            <SubmitButton
              label="Save"
              variant="contained"
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default Profile as ComponentType;

