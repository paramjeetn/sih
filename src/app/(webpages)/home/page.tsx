import React from 'react';
import Navbar from '@/components/Navbar';
import ComplaintBox from '@/components/ComplaintBox';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
  <header className="sticky top-0 z-50 bg-white shadow-md">
    <Navbar />
  </header>
  <main className="flex-grow flex justify-start items-center bg-gray-100 p-6">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full ml-4">
      <ComplaintBox />
    </div>
  </main>
  <footer className="bg-gray-200 py-4 mt-auto">
    <Footer />
  </footer>
</div>

  );
};

export default HomePage;