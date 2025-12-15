import React from 'react';
import Herosection from './Herosection';
import HomeCard from '../HomeDecore/AllProperty';

const Home = () => {
  return (
    <div className='w-11/12 mx-auto'>
      <Herosection></Herosection>
      <HomeCard></HomeCard>
    </div>
  );
};

export default Home;