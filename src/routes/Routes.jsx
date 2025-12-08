import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import ManageProduct from '../pages/Dashboard/Manager/ManageProduct'
import ApproveOrders from '../pages/Dashboard/Manager/ApproveOrders'
import MyOrders from '../pages/Dashboard/Buyer/MyOrders'
import { createBrowserRouter } from 'react-router'
import Register from '../pages/Register/Register'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import AddProduct from '../pages/Dashboard/Manager/AddProduct'
import AllProducts from '../pages/AllProducts/AllProducts'
import AboutUs from '../pages/AboutUs/AboutUs'
import Contact from '../pages/Contact/Contact'
import AuthLayout from '../layouts/AuthLayout'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import AdminAllProducts from '../pages/Dashboard/Admin/AdminAllProducts';
import AllOrders from '../pages/Dashboard/Admin/AllOrders'
import PendingOrders from '../pages/Dashboard/Manager/PendingOrders'
import TrackOrder from './../pages/Dashboard/Buyer/TrackOrder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-products',
        element: <AllProducts />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },



  // { path: '/login', element: <Login /> },
  // { path: '/register', element: <Register /> },


  // dashboard routes
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-product',
        element: (
          <PrivateRoute>
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-products',
        element: (
          <PrivateRoute>
            <AdminAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-orders',
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'track-order',
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: 'pending-orders',
        element: <PendingOrders />,
      },
      {
        path: 'approve-orders',
        element: <ApproveOrders />,
      },
    ],
  },
])