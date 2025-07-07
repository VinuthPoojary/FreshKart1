import React from 'react';
import { assets } from '../assets/assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-[72px] lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[18rem] md:max-w-[20rem] lg:max-w-[26.25rem] leading-tight lg:leading-[3.75rem]">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 px-7 md:px-[60px] py-2 bg-[#00B207] hover:bg-[#00a106] text-white font-semibold rounded-full shadow-md cursor-pointer transition duration-300"
          >
            Shop now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4 md:hidden transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
