import React from 'react';
import Navbar from '@/components/Navbar';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </main>
    </div>
  );
};

export default AdminPage;
