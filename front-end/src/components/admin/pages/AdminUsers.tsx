import { MouseEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { Form } from "../../form/Form";
import { Input } from "../../form/Input";
import { Select } from "../../form/Select";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SubmitButton } from "../../form/SubmitButton";
import { TypeUser, TypeUserCreate } from "../types";
import { useAccountStore } from "../../stores/GlobalStore";
import { deleteUser, getAllUsers } from "../api";
import { roleOptions, showErrorMessage, showSuccessMessage } from "../../helper/Helper";
import { composeInitialState } from "../../utils/Helpers";
import { useHookForm } from "../../libs/HookForm";
import User from "./parts/User";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<TypeUser[]>();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Context Menu State (supports both button click and right-click)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextPosition, setContextPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<TypeUser | null>(null);

  const isMenuOpen = Boolean(anchorEl) || Boolean(contextPosition);

  const setLoading = useAccountStore(store => store.setIsLoading);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      if (response?.data && response?.success) {
        showSuccessMessage(response.successMessage || "Failed to retrieved users");
        setUsers(response.data);
      } else {
        throw new Error(response?.errorMessage || "");
      }

    } catch (error: any) {
      console.error("Error loading users:", error);
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Open menu via 3-dots IconButton click
  const handleMenuClick = (event: MouseEvent<HTMLElement>, user: TypeUser) => {
    event.stopPropagation();
    setSelectedUser(user);
    setContextPosition(null);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setContextPosition(null);
    setSelectedUser(null);
  };

  // Handle Delete Action from Context Menu
  const handleDeleteAction = async () => {
    try {
      setLoading(true);
      if (!selectedUser) return;
      
      const response = await deleteUser(selectedUser._id);

      if (response?.success) {
        showSuccessMessage(response.successMessage);
        await loadUsers();
      } else {
        throw new Error(response?.errorMessage || "");
      }

      handleMenuClose();
    } catch (error) {
      console.error(error);
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleCancelEdit = () => {
  //   setEditingUserId(null);
  //   methods.reset({
  //     name: "",
  //     email: "",
  //     password: "",
  //     role: "customer",
  //   });
  // };

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <div className="tw:max-w-7xl tw:mx-auto tw:w-full">
      <h1 className="tw:text-2xl tw:md:text-3xl tw:font-bold tw:mb-6">All Users</h1>

      {/* Add User Form using your Form/Input/Select components */}
      <div className="tw:bg-white tw:p-4 tw:md:p-6 tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:mb-8">
        <h2 className="tw:text-lg tw:font-semibold tw:mb-4">Add New User</h2>

        <User doOnSubmit={loadUsers} />
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
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    // onContextMenu={(e) => handleRowContextMenu(e, user)}
                    className="tw:hover:bg-gray-50 tw:cursor-context-menu"
                  >
                    <td className="tw:py-3 tw:px-4 tw:font-medium tw:text-gray-900 tw:whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap">
                      <span className="tw:px-2.5 tw:py-1 tw:bg-gray-100 tw:rounded tw:text-xs tw:font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="tw:py-3 tw:px-4 tw:whitespace-nowrap tw:text-right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, user)}
                        aria-label="User Actions"
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="tw:py-6 tw:text-center tw:text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }

      {/* MUI Context Menu for Edit & Delete */}
      <Menu
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorReference={contextPosition ? "anchorPosition" : "anchorEl"}
        anchorPosition={
          contextPosition
            ? { top: contextPosition.top, left: contextPosition.left }
            : undefined
        }
        slotProps={{
          paper: {
            elevation: 3,
            sx: { minWidth: 140, borderRadius: "8px" },
          },
        }}
      >
        <MenuItem
        //  onClick={handleEditAction}
        >
          {/* <ListItemIcon>
            <EditOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon> */}
          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem
          onClick={handleDeleteAction}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
};
