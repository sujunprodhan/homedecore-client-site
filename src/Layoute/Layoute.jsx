import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Componets/Navbar';
import Footer from '../Componets/Footer';

const Layoute = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layoute;
