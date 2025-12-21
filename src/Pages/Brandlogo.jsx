import Marquee from 'react-marquee-slider';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';
import brand7 from '../assets/brand7.png';
import brand8 from '../assets/brand8.png';


const BrandLogo = () => {
  return (
    <div>
      <div className="py-2 flex">
        <marquee behavior="" direction="">
          <div className="flex gap-5">
            <img src={brand1} alt="" />
            <img src={brand2} alt="" />
            <img src={brand3} alt="" />
            <img src={brand4} alt="" />
            <img src={brand5} alt="" />
            <img src={brand6} alt="" />
            <img src={brand7} alt="" />
            <img src={brand} alt="" />
          </div>
        </marquee>
      </div>
    </div>
  );
};

export default BrandLogo;
