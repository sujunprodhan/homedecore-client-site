import { createBrowserRouter } from "react-router";
import Layoute from "../Layoute/Layoute";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Componets/Login";
import Register from "../Componets/Register";
import Covarage from "../Pages/Covarage";
import BookingPage from "../Pages/BookingPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyBooking from "../Pages/MyBooking";
import ServiceDetails from "../Pages/ServiceDetails";
import DashboardLayout from "../DashboardLayoute/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AdminBookings from "../Pages/AdminBookings";

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
        element: <ServiceDetails></ServiceDetails>,
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
            element: (
              <PrivateRoute>
                <BookingPage></BookingPage>
              </PrivateRoute>
            ),
          },

          {
            path: 'my-bookings',
            element: <MyBooking />,
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