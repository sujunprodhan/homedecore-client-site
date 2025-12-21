// ===================== LoadingSpinner.jsx =====================
import React from 'react';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="#E92C8F" height={50} width={6} radius={2} margin={4} />
    </div>
  );
};

export default LoadingSpinner;
