import React from 'react';
import Navbar from '@/components/Navbar';
import ComplaintBox from '@/components/ComplaintBox';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <ComplaintBox />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
