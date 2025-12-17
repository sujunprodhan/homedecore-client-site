import { createBrowserRouter } from "react-router";
import Layoute from "../Layoute/Layoute";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Componets/Login";
import Register from "../Componets/Register";
import Covarage from "../Pages/Covarage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyBooking from "../Pages/MyBooking";
import ServiceDetails from "../Pages/ServiceDetails";
import DashboardLayout from "../DashboardLayoute/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AdminBookings from "../Pages/AdminBookings";
import Payment from "../DashboardLayoute/Payment";
import PaymentSuccess from "../DashboardLayoute/PaymentSuccess";
import PyamentCancel from "../DashboardLayoute/PyamentCancel";
import PaymentHistory from "../DashboardLayoute/PaymentHistory/PaymentHistory";

// import DashboardLayout from '../layouts/DashboardLayout';
// import MyBooking from '../pages/MyBooking';
// import AdminBookings from '../pages/AdminBookings';
// import PrivateRoute from './PrivateRoute';
// import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layoute />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: '/services',
        element: <Services></Services>,
        loader: () => fetch('http://localhost:3000/homeservice').then((res) => res.json()),
      },
      {
        path: '/servicedetails/:id',
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:3000/homeservice/${params.id}`),
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/contact',
        element: <Contact></Contact>,
      },
      {
        path: '/covarage',
        element: <Covarage></Covarage>,
        loader: () => fetch('/service.json').then((res) => res.json()),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },

      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'bookingpage',
            element: <PrivateRoute></PrivateRoute>,
          },
          {
            path: 'my-booking',
            element: <MyBooking />,
          },
          {
            path: 'payment/:bookingId',
            element: <Payment />,
          },
          {
            path: 'payment-success',
            element: <PaymentSuccess></PaymentSuccess>,
          },
          {
            path: 'payment-cancel',
            element: <PyamentCancel></PyamentCancel>,
          },
          {
            path: 'payment-history',
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            path: 'admin-bookings',
            element: (
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);