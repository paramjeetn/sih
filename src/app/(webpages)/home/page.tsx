


import React from 'react';
import Navbar from '@/components/Navbar';
import ComplaintBox from '@/components/ComplaintBox';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
  <main className="flex-grow flex justify-start items-center bg-gray-100 p-6">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full ml-4">
      <ComplaintBox />
    </div>

    {/* side_image_code */}
    {/* <div className="w-1/2 flex justify-center items-center">
  <div className="w-full h-full">
    <img
      src="/home_page.jpg" 
      alt="RAIL-MADAD"
      className="w-full h-full object-cover rounded-md"
    />
  </div>
</div> */}


  </main>
  <footer className="bg-gray-200 py-4 mt-auto">
    <Footer />
  </footer>
</div>

  );
};

export default HomePage;

