import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouteObject
} from "react-router";
import { Loading } from '../elements/Loading';
import { Common } from '../layout/Common';

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
const ProductDetails = lazy(() => import("../products/pages/ProductDetails"));

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

export const publicRoute = [
  {
    path: "login",
    element: <Login />,
    isSignIn: false,
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

const commonRoute = [
  {
    path: "/",
    index: true,
    element: <Home />,
    // isSignIn: false,
    isCommon: true
  },
  {
    path: "/collection/all",
    index: true,
    element: <CollectionList />,
    // isSignIn: false,
    isCommon: true
  },
  {
    path: "/product/details/:id",
    index: true,
    element: <ProductDetails />,
    // isSignIn: false,
    isCommon: true
  },
  {
    path: "user-layout",
    element: <UserLayout />,
    // isSignIn: false,
    isCommon: true
  },
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
//     } else if (route.isCommon == true) {
//       routeObj = {
//         path: route.path,
//         element: <Common>{route.element}</Common>
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
// const COMMON_ROUTE = decideParentRoute(commonRoute);

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Loading />}><Layout /></Suspense>,
    // element: <Private />,
    children: [
      // ...PUBLIC_ROUTE,
      // ...PRIVATE_ROUTE,
      // ...COMMON_ROUTE,
      {
        path: "/",
        element: <Suspense fallback={<Loading />}><Public /></Suspense>,
        children: [
          ...publicRoute.map(x => {
            return {
              path: x.path,
              element: <Suspense fallback={<Loading />}>{x.element}</Suspense>
            };
          })
        ]
      },
      {
        path: "/",
        element: <Suspense fallback={<Loading />}><Private /></Suspense>,
        children: [
          ...privateRoute.map(x => {
            return {
              path: x.path,
              element: <Suspense fallback={<Loading />}>{x.element}</Suspense>
            };
          })
        ]
      },
      {
        path: "/",
        element: <Suspense fallback={<Loading />}><Common /></Suspense>,
        children: [
          ...commonRoute.map(x => {
            return {
              index: x.index,
              path: x.path,
              element: <Suspense fallback={<Loading />}>{x.element}</Suspense>
            };
          })
        ]
      },
    ]
  }
]);