import { createBrowserRouter } from "react-router";
import Layoute from "../Layoute/Layoute";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Componets/Login";
import Register from "../Componets/Register";
import Covarage from "../Pages/Covarage";

export const router= createBrowserRouter([
  {
    path:'/',
    element:<Layoute/>,
    children:[
      {
        index: true,
        element:<Home></Home>
      },
      {
        path:'/services',
        element:<Services></Services>
      },
      {
        path:'/about',
        element:<About></About>
      },
    {
      path:'/contact',
      element:<Contact></Contact>
    },
    {
      path:'/covarage',
      element:<Covarage></Covarage>,
      loader: () => fetch('/service.json').then((res) => res.json()),
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element:<Register></Register>
    }
    ]
  }
])