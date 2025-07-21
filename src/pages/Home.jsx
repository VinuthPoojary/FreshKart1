
import React, { useState } from 'react';
import MainBanner from '../components/MainBanner';
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import BottomBanner from '../components/BottomBanner';
import NewsLetter from '../components/NewsLetter';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller search={searchQuery} /> {/* ✅ Optional: Pass search query */}
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
