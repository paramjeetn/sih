import React from 'react';
import Sidebar from '@/components/Sidebar';
import ComplaintsTable from '@/components/ComplaintsTable';

const UserDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Your Complaints</h1>
        <ComplaintsTable />
      </div>
    </div>
  );
};

export default UserDashboard;
