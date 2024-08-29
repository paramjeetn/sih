"use client"; // Ensure this is a client component

import React from 'react';
import { useRouter } from 'next/navigation';

const ComplaintsTable = () => {
  const router = useRouter();

  const handleRowClick = (id) => {
    router.push(`/user/${id}`);
  };

  const complaints = [
    { id: 123, pnr: 22, complaint: 'text', date: '23/01/22', status: 'Resolved' },
    { id: 233, pnr: 32, complaint: 'text', date: '21/01/21', status: 'Pending' },
    { id: 334, pnr: 23, complaint: 'text', date: '08/11/23', status: 'Resolved' },
    { id: 4334, pnr: 11, complaint: 'text', date: '09/12/24', status: 'Resolved' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Problem ID</th>
            <th className="py-2 px-4 border-b">PNR</th>
            <th className="py-2 px-4 border-b">Complaint</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr
              key={complaint.id}
              onClick={() => handleRowClick(complaint.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{complaint.id}</td>
              <td className="py-2 px-4 border-b">{complaint.pnr}</td>
              <td className="py-2 px-4 border-b">{complaint.complaint}</td>
              <td className="py-2 px-4 border-b">{complaint.date}</td>
              <td className="py-2 px-4 border-b">{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
