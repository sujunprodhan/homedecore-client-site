import { createBrowserRouter } from "react-router";
import Layoute from "../Layoute/Layoute";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Componets/Login";
import Register from "../Componets/Register";
import Covarage from "../Pages/Covarage";
import Property from "../HomeDecore/Property";
import BookingPage from "../Pages/BookingPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyBooking from "../Pages/MyBooking";

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
        path: 'property',
        element: <Property></Property>,
      },
      {
        path: 'bookingpage',
        element: (
          <PrivateRoute>
            <BookingPage></BookingPage>
          </PrivateRoute>
        ),
      },
      {
        path:'mybooking',
        element:<PrivateRoute>
          <MyBooking></MyBooking>
        </PrivateRoute>
      },
      {
        path: '/services',
        element: <Services></Services>,
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
    ],
  },
]);