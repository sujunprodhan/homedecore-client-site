import { createBrowserRouter } from 'react-router';
import Layoute from '../Layoute/Layoute';
import Home from '../Pages/Home';
import Services from '../Pages/Services';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Login from '../Componets/Login';
import Register from '../Componets/Register';
import Covarage from '../Pages/Covarage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import MyBooking from '../Pages/MyBooking';
import ServiceDetails from '../Pages/ServiceDetails';
import DashboardLayout from '../DashboardLayoute/DashboardLayout';
import AdminRoute from './AdminRoute';

// Dashboard Pages
import Payment from '../DashboardLayoute/Payment';
import PaymentSuccess from '../DashboardLayoute/PaymentSuccess';
import PyamentCancel from '../DashboardLayoute/PyamentCancel';
import PaymentHistory from '../DashboardLayoute/PaymentHistory/PaymentHistory';

// Admin
import AdminBookings from '../Pages/AdminBookings';
import AdminDashboard from '../Admin/AdminDashboard';
import ManageUser from '../Admin/ManageUsers';
import AssignDecorator from '../Admin/AssignDecorator';
import ManageBookings from '../Admin/ManageBookings';
import ManageServices from '../Admin/ManageServices';
import Revenue from '../Admin/Revenue';
import ErrorPage from '../Pages/ErrorPage';
import ManageDecorators from '../Admin/ManageBookings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '*',
        element: <ErrorPage></ErrorPage>,
      },
      {
        path: 'services',
        element: <Services />,
        loader: () => fetch('http://localhost:3000/homeservice').then((res) => res.json()),
      },

      {
        path: 'servicedetails/:id',
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:3000/homeservice/${params.id}`),
      },

      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },

      {
        path: 'covarage',
        element: <Covarage />,
        loader: () => fetch('/service.json').then((res) => res.json()),
      },

      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      // ================= DASHBOARD =================
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <MyBooking />,
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
            element: <PaymentSuccess />,
          },

          {
            path: 'payment-cancel',
            element: <PyamentCancel />,
          },

          {
            path: 'payment-history',
            element: <PaymentHistory />,
          },

          // ========== ADMIN ==========
          {
            path: 'admin-bookings',
            element: (
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            ),
          },
          {
            path: 'admin-dashboard',
            element: <AdminDashboard></AdminDashboard>,
          },
          {
            path: 'manage-users',
            element: <ManageUser></ManageUser>,
          },
          {
            path: 'assign-decorator',
            element: <AssignDecorator></AssignDecorator>,
          },
          {
            path:'manage-decorators',
            element:<ManageDecorators></ManageDecorators>
          },
          {
            path: 'manage-bookings',
            element: <ManageBookings></ManageBookings>,
          },
          {
            path: 'manage-services',
            element: <ManageServices></ManageServices>,
          },
          
          {
            path: 'revenue',
            element: <Revenue />,
          },
        ],
      },
    ],
  },
]);
