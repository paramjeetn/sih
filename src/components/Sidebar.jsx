import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4 w-64 flex flex-col">
      {/* User Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Dashboard</h2>
        <p className="mb-1">Name: John Doe</p>
        <p className="mb-1">Email: john.doe@example.com</p>
        <p className="mb-1">Phone: +1234567890</p>
        <p>Total Complaints - 3/5</p>
      </div>
    </div>
  );
};

export default Sidebar;
