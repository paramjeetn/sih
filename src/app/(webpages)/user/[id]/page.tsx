"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

const UserDetailPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <h1 className="text-2xl">User Detail Page for ID: {id}</h1>
      </main>
    </div>
  );
};

export default UserDetailPage;
