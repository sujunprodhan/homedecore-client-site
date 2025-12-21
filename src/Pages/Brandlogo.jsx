import Marquee from 'react-marquee-slider';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';


const BrandLogo = () => {
  return (
    <div>
      <div className="py-2 flex">
        <marquee behavior="" direction="">
          <div className="flex gap-5">
            <img src={brand1} alt="" />
            <img src={brand2} alt="" />
            <img src={brand3} alt="" />
          </div>
        </marquee>
      </div>
    </div>
  );
};

export default BrandLogo;
