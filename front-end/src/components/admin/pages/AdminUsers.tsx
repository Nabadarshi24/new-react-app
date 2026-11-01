import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form } from "../../form/Form";
import { Input } from "../../form/Input";
import { Select } from "../../form/Select";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SubmitButton } from "../../form/SubmitButton";
import { TypeUser, TypeUserCreate } from "../types";
import { useAccountStore } from "../../stores/GlobalStore";
import { getAllUsers } from "../api";
import { roleOptions, showErrorMessage, showSuccessMessage } from "../../helper/Helper";
import { composeInitialState } from "../../utils/Helpers";
import { useHookForm } from "../../libs/HookForm";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  const setLoading = useAccountStore(store => store.setIsLoading);

  const { initialState, names, labels } = composeInitialState<TypeUserCreate>({
    name: "",
    email: "",
    role: ""
  });

  const schema = Yup.object<TypeUserCreate>().shape({
    name: Yup.string().required().label(labels.name),
    email: Yup.string().email().required().label(labels.email),
    role: Yup.string().label(labels.role)
  });

  const methods = useHookForm<TypeUserCreate>({
    initialState,
    schema
  });

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      if (response.data && response.success) {
        showSuccessMessage(response.successMessage);
        setUsers(response.data);
      } else {
        throw new Error(response.errorMessage);
      }

    } catch (error) {
      console.error("Error loading users:", error);
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: UserFormValues) => {
    setUsers((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role,
      },
    ]);
    methods.reset();
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user._id !== id));
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <div className="tw:max-w-7xl tw:mx-auto tw:w-full">
      <h1 className="tw:text-2xl tw:md:text-3xl tw:font-bold tw:mb-6">All Users</h1>

      {/* Add User Form using your Form/Input/Select components */}
      <div className="tw:bg-white tw:p-4 tw:md:p-6 tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:mb-8">
        <h2 className="tw:text-lg tw:font-semibold tw:mb-4">Add New User</h2>
        <Form methods={methods} onSubmit={onSubmit}>
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4 tw:mb-4">
            <Input name="name" label="Full Name" required />
            <Input name="email" label="Email Address" type="email" required />
            <Input name="password" label="Password" type="password" required />
            <Select
              name="role"
              label="Role"
              options={roleOptions}
            />
          </div>
          <div className="tw:w-full tw:sm:w-48">
            <SubmitButton label="Add User" />
          </div>
        </Form>
      </div>

      {/* Responsive Users Table */}
      {
        users &&
        <div className="tw:bg-white tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:overflow-x-auto">
          <table className="tw:min-w-full tw:text-left tw:text-gray-600">
            <thead className="tw:bg-gray-100 tw:text-xs tw:uppercase tw:text-gray-700">
              <tr>
                <th className="tw:py-3 tw:px-4">Name</th>
                <th className="tw:py-3 tw:px-4">Email</th>
                <th className="tw:py-3 tw:px-4">Role</th>
                <th className="tw:py-3 tw:px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="tw:divide-y tw:divide-gray-200 tw:text-sm">
              {users.map((user) => (
                <tr key={user._id} className="tw:hover:bg-gray-50">
                  <td className="tw:py-3 tw:px-4 tw:font-medium tw:text-gray-900 tw:whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap">{user.email}</td>
                  <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap">
                    <span className="tw:px-2 tw:py-1 tw:bg-gray-100 tw:rounded tw:text-xs tw:font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteOutlineIcon />}
                      onClick={() => handleDelete(user._id)}
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};
