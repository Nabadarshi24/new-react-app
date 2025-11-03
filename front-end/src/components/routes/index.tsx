import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouteObject
} from "react-router";

const Private = lazy(() => import("../layout/Private"));
const Public = lazy(() => import("../layout/Public"));
const Layout = lazy(() => import("../layout/Layout"));
const Home = lazy(() => import("../home/pages/Home"));
const Dashboard = lazy(() => import("../dashboard/pages/Dashboard"));
const Profile = lazy(() => import("../accounts/pages/Profile"));
const ListUser = lazy(() => import("../user/ListUser"));
const Details = lazy(() => import("../user/parts/Details"));
const Login = lazy(() => import("../accounts/pages/Login"));
const VerifyOtp = lazy(() => import("../accounts/pages/VerifyOtp"));
const ForgotPassword = lazy(() => import("../accounts/pages/ForgotPassword"));
const SignUp = lazy(() => import("../accounts/pages/SignUp"));
const UserLayout = lazy(() => import("../layout/UserLayout"));
const CollectionList = lazy(() => import("../products/pages/CollectionList"));

const privateRoute = [
  {
    path: "dashboard",
    element: <Dashboard />,
    isSignIn: true
  },
  {
    path: "/profile",
    element: <Profile />,
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
    index: true,
    element: <Home />,
    isSignIn: false
  },
  {
    path: "/collections/:collection",
    index: true,
    element: <CollectionList />,
    isSignIn: false
  },
  {
    path: "user-layout",
    element: <UserLayout />,
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
    element: <Suspense fallback={<div className="tw:text-black">Loading...</div>}><Layout /></Suspense>,
    // element: <Private />,
    children: [
      // ...PUBLIC_ROUTE,
      // ...PRIVATE_ROUTE,
      {
        path: "/",
        element: <Suspense fallback={<div className="tw:text-black">Loading...</div>}><Public /></Suspense>,
        children: [
          ...publicRoute.map(x => {
            return {
              path: x.path,
              element: <Suspense fallback={<div className="tw:text-black">Loading...</div>}>{x.element}</Suspense>
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
              element: <Suspense fallback={<div className="tw:text-black">Loading...</div>}>{x.element}</Suspense>
            };
          })
        ]
      },
    ]
  }
]);