import {
  createBrowserRouter,
  Navigate,
  RouteObject
} from "react-router";

import { Private } from "../layout/Private";
import { Dashboard } from "../dashboard/pages/Dashboard";
import { ListUser } from "../user/ListUser";
import { Details } from "../user/parts/Details";
import { Login } from "../accounts/pages/Login";
import { VerifyOtp } from "../accounts/pages/VerifyOtp";
import { ForgotPassword } from "../accounts/pages/ForgotPassword";
import { Layout } from "../layout/Index";
import { Public } from "../layout/Public";
import { AgencyList } from "../agency/pages/List";
import { SignUp } from "../accounts/pages/SignUp";
import { Profile } from "../accounts/pages/Profile";

const privateRoute = [
  {
    path: "dashboard",
    element: <Dashboard />,
    isSignIn: true
  },
  {
    path: "account/profile",
    element: <Profile />,
    isSignIn: true
  },
  {
    path: "agency/list",
    element: <AgencyList />,
    isSignIn: true
  },
  {
    path: "users",
    element: <ListUser />,
    isSignIn: true
  },
  {
    path: "users/details/:userId",
    element: <Details />,
    isSignIn: true
  },
];

const publicRoute = [
  {
    path: "/",
    // index: true,
    element: <Navigate to="/login" replace />,
    isSignIn: false
  },
  {
    path: "login",
    element: <Login />,
    isSignIn: false
  },
  {
    path: "verify-otp",
    element: <VerifyOtp />,
    isSignIn: false
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    isSignIn: false
  },
  {
    path: "sign-up",
    element: <SignUp />,
    isSignIn: false
  }
];

// const decideParentRoute = (routes) => {
//   const routeArray = [];
//   routes.forEach(route => {
//     let routeObj;
//     if (route.isSignIn == true) {
//       routeObj = {
//         path: route.path,
//         element: <Private>{route.element}</Private>
//       }
//       routeArray.push(routeObj);
//     } else {
//       routeObj = {
//         path: route.path,
//         element: <Public>{route.element}</Public>
//       }
//       routeArray.push(routeObj);
//     }
//   })
//   return routeArray;
// };

// const PUBLIC_ROUTE = decideParentRoute(publicRoute);
// const PRIVATE_ROUTE = decideParentRoute(privateRoute);

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // element: <Private />,
    children: [
      // ...PUBLIC_ROUTE,
      // ...PRIVATE_ROUTE,
      {
        path: "/",
        element: <Public />,
        children: [
          ...publicRoute.map(x => {
            return {
              path: x.path,
              element: x.element
            };
          })
        ]
      },

      {
        path: "/",
        element: <Private />,
        children: [
          ...privateRoute.map(x => {
            return {
              path: x.path,
              element: x.element
            };
          })
        ]
      },
    ]
  }
]);