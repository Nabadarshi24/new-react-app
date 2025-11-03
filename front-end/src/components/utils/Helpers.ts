import { json } from "stream/consumers";
import { TypeLogin, TypeLoginUserData, TypeSignUp, TypeUserData, TypeUserProfile } from "../accounts/types";
import { v4 as uuidv4 } from 'uuid';
import { console } from "inspector"; import {
  Facebook,
  Instagram,
  X,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalMall,
  Autorenew,
  CreditCard,
  FilterListAlt
} from '@mui/icons-material';

export const icons = {
  Facebook,
  Instagram,
  X,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalMall,
  Autorenew,
  CreditCard,
  FilterListAlt
}

const covertToTitleCase = (str: string) => {
  let strArr = [];
  let startPos = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == str[i].toUpperCase()) {
      let val = str.slice(startPos, i);
      strArr.push(val);
      startPos = i;
    }
  }

  strArr.push(str.slice(startPos));
  let newStr = strArr.join(" ");
  let finalStr = newStr.replace(newStr[0], newStr[0].toUpperCase());

  return finalStr;
};

// type TypeAgrgs<T extends object> = ({
//   [property in keyof T]: T[property] | [T[property], string];
// })

// export const composeInitialState = <T extends object>(obj: T): { [property in keyof T]: T[property] | [T[property], string]} => {
// export const composeInitialState = <T extends object>(obj: TypeAgrgs<T>) => {
export const composeInitialState = <T extends object>(obj: { [property in keyof T]: T[property] | [T[property], string] }) => {
  let initialState = {} as T;
  let names = {} as { [property in keyof T]: keyof T };
  let labels = {} as { [property in keyof T]: string };

  Object.entries(obj).forEach(x => {
    let key = x[0] as keyof T;
    let value = x[1] as T[keyof T];
    let property = "";

    let newKey;

    if (Array.isArray(value)) {
      property = value[1];
      value = value[0];
    } else {
      newKey = key.toString();

      if (newKey.startsWith("is")) {
        property = newKey.replace(newKey, newKey.slice(2));
      }

      if (newKey.startsWith("has")) {
        property = newKey.replace(newKey, newKey.slice(3));
      }

      if (newKey.endsWith("Id")) {
        let val = newKey.replace(newKey.slice(-2), "");
        property = covertToTitleCase(val);
      }

      if (newKey == "id") {
        property = newKey.toUpperCase();
      }
    }

    initialState[key] = value;
    names[key] = key;
    labels[key] = property == "" ? covertToTitleCase(newKey) : property;
  });

  return {
    initialState,
    names,
    labels
  };
};

const uuidTo8DigitString = (uuid: string) => {
  // Remove hyphens from the UUID
  const cleanUuid = uuid.replace(/[-a-zA-Z]/g, '');

  // Take the first 8 characters
  const shortString = cleanUuid.substring(0, 8);

  return shortString;
};

export const createUser = (formData: TypeSignUp) => {
  const user = localStorage.getItem("userData");

  const userData: TypeUserData[] = JSON.parse(user) ?? [];

  if (userData.length > 0 &&
    userData.find((x: TypeUserData) => x.email == formData.email)
  ) {
    return {
      success: false,
      message: "User already exists"
    };
  }

  let userObject: TypeUserData = {
    id: uuidTo8DigitString(uuidv4()),
    isVerified: formData.userRole == "admin" ? true : false,
    isDeleted: false,
    // userName: formData.firstName.toLocaleLowerCase() + "." + formData.lastName.toLocaleLowerCase(),
    ...formData
  };

  userData.push(userObject);
  const userDataJson = JSON.stringify(userData);

  // console.log({ userDataJson })

  localStorage.setItem("userData", userDataJson)

  return {
    success: true,
    message: "User created successfully"
  };
}

export const loginUser = (payload: TypeLogin) => {
  const userData = localStorage.getItem("userData");
  const user: TypeUserData = JSON.parse(userData).find((x: TypeUserData) => x.email == payload.userName && x.password == payload.password);

  if (user) {
    return {
      success: true,
      message: "User logged in successfully",
      data: user
    };
  } else {
    return {
      success: false,
      message: "Invalid username or password"
    };
  }

}

// export const updateUser = (payload: TypeUserProfile) => {
//   const loggedUser = localStorage.getItem("loggedUser");
//   const user: TypeLoginUserData = JSON.parse(loggedUser);

//   user.firstName = payload.firstName;
//   user.lastName = payload.lastName;
//   user.email = payload.email;
//   user.roleLabel = payload.userRole;
//   user.isVerified = payload.isVerified;
//   user.isDeleted = payload.isDeleted;

//   console.log({ user })

//   localStorage.setItem("loggedUser", JSON.stringify(user));

//   return {
//     success: true,
//     message: "User updated successfully"
//   };
// };

