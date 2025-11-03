import {
  ComponentType,
  useCallback,
  useEffect
} from 'react';
import { MyOrders } from './parts/MyOrders';

const Profile = () => {

  // const { initialState, names, labels } = composeInitialState<TypeUserProfile>({
  //   email: "",
  //   userName: "",
  //   firstName: "",
  //   lastName: "",
  //   userRole: "",
  //   // password: "",
  //   isVerified: false,
  //   isDeleted: false
  // });

  // const schema = Yup.object<TypeUserProfile>().shape({
  //   email: Yup.string().email().required().label(labels.email),
  //   userName: Yup.string().required().label(labels.userName),
  //   firstName: Yup.string().required().label(labels.firstName),
  //   lastName: Yup.string().required().label(labels.lastName),
  //   // password: Yup.string().required().label(labels.password),
  //   userRole: Yup.string().required().label(labels.userRole),
  //   isVerified: Yup.boolean().required().label(labels.isVerified),
  //   isDeleted: Yup.boolean().required().label(labels.isDeleted)
  // })

  // const methods = useHookForm<TypeUserProfile>({
  //   initialState,
  //   schema
  // });

  // const onMount = useCallback(() => {
  //   const loggedUser = localStorage.getItem("loggedUser");
  //   if (loggedUser) {
  //     const user: TypeLoginUserData = JSON.parse(loggedUser);
  //     methods.setValue(names.userName, user.firstName.toLocaleLowerCase() + "." + user.lastName.toLocaleLowerCase());
  //     methods.setValue(names.firstName, user.firstName);
  //     methods.setValue(names.lastName, user.lastName);
  //     methods.setValue(names.email, user.email);
  //     methods.setValue(names.userRole, user.roleLabel);
  //     methods.setValue(names.isVerified, user.isVerified);
  //     methods.setValue(names.isDeleted, user.isDeleted);
  //   }
  // }, []);

  // const onSubmit = async () => {
  //   console.log("YYYY")
  //   try {
  //     const formData = methods.getValues();
  //     const response = updateUser(formData);

  //     if (response.success && response.message) {
  //       window.alert(response.message);
  //       onMount();
  //     }
  //   } catch (error) {

  //   }
  // };

  // useEffect(() => {
  //   onMount();
  // }, []);

  return (
    <div className="tw:min-h-screen tw:flex tw:flex-col">
      <div className="tw:flex-grow tw:container tw:mx-auto tw:p-4 tw:md:p-6">
        <div className="tw:flex tw:flex-col tw:md:flex-row tw:md:space-x-6 tw:space-y-6 tw:md:space-y-0">
          <div className="tw:w-full tw:md:w-1/3 tw:lg:w-1/4 tw:shadow tw:rounded-lg tw:p-6 tw:bg-gray-50">
            <h1 className="tw:text-2xl tw:md:text-3xl tw:font-bold tw:mb-4">Profile</h1>
            <p className="tw:text-lg tw:text-gray-600 tw:mb-4">john.doe@example.com</p>
            <button className="tw:w-full tw:bg-red-500 tw:text-white tw:py-2 tw:rounded tw:hover:bg-red-600">Logout</button>
          </div>

          <div className="tw:w-full tw:md:w-2/3 tw:lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile as ComponentType;

