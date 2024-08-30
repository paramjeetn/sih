// "use client"
// import React from 'react';
// import Navbar from '@/components/Navbar';

// const AdminPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow flex justify-center items-center bg-gray-100 p-6">
//         <h1 className="text-2xl">Admin Dashboard</h1>
//       </main>
//     </div>
//   );
// };

// export default AdminPage;

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useComplaint } from '../../../lib/ComplaintContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface Complaint {
  id: string;
  userId: number;
  problemId: number;
  phone: number;
  pnr: number;
  enhancedComplaint: string;
  severity?: 'High' | 'Mid' | 'Low';
  date: string;
  status: boolean;
  email: string;
  fileUrl?: string;
  department?: string;
}

interface Admin {
  name: string;
  email: string;
  phone: string;
  totalComplaintsHandled: number;
  profileImage: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const { setComplaint } = useComplaint();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const q = query(collection(db, 'departments'));
      const querySnapshot = await getDocs(q);
      const fetchedComplaints: Complaint[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComplaints.push({
          id: doc.id,
          userId: data.userId,
          problemId: data.problemId,
          phone: data.phone,
          pnr: data.pnr,
          enhancedComplaint: data.enhancedComplaint,
          severity: data.severity,
          date: data.date,
          status: data.status,
          email: data.email,
          fileUrl: data.fileUrl,
          department: data.department,
        });
      });

      setComplaints(fetchedComplaints);
    };

    const fetchAdminDetails = async () => {
      const q = query(collection(db, 'departments'), where('email', '==', 'admin@example.com')); // Replace with actual email or identifier
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        setAdmin({
          name: adminData.name,
          email: adminData.email,
          phone: adminData.phone,
          totalComplaintsHandled: fetchedComplaints.length, // Update based on fetched complaints
          profileImage: adminData.profileImage,
        });
      }
    };

    fetchComplaints();
    fetchAdminDetails();
  }, []);

  const markAsSolved = (problemId: number) => {
    const updatedComplaints = complaints.filter((complaint) => complaint.problemId !== problemId);
    setComplaints(updatedComplaints);

    if (admin) {
      setAdmin({
        ...admin,
        totalComplaintsHandled: admin.totalComplaintsHandled + 1,
      });
    }
  };

  const handleComplaintClick = (complaint: Complaint) => {
    setComplaint(complaint);
    router.push(`/admin/${complaint.problemId}`);
  };

  return (
    <div className="min-h-screen flex p-6 bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-6 mr-6 flex flex-col items-center">
        {admin && (
          <>
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 overflow-hidden">
              <img src={admin.profileImage} alt="Profile" className="rounded-full object-cover w-full h-full" />
            </div>
            <div className="text-center mb-4">
              <p className="font-semibold text-lg">{admin.name}</p>
              <p className="text-gray-500">{admin.email}</p>
              <p className="text-gray-500">{admin.phone}</p>
            </div>
            <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2 w-full text-center">
              <p>Total Complaints Handled</p>
              <p className="font-bold text-xl">{admin.totalComplaintsHandled}</p>
            </div>
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-3/4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b border-gray-300 py-2 px-4 text-left">Problem ID</th>
                <th className="border-b border-gray-300 py-2 px-4 text-left">PNR</th>
                <th className="border-b border-gray-300 py-2 px-4 text-left">Complaint</th>
                <th className="border-b border-gray-300 py-2 px-4 text-left">Date</th>
                <th className="border-b border-gray-300 py-2 px-4 text-left">Severity</th>
                <th className="border-b border-gray-300 py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.problemId} className="hover:bg-gray-50">
                  <td className="border-b border-gray-300 py-2 px-4">{complaint.problemId}</td>
                  <td className="border-b border-gray-300 py-2 px-4">{complaint.pnr}</td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    <span
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => handleComplaintClick(complaint)}
                    >
                      {complaint.enhancedComplaint}
                    </span>
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">{complaint.date}</td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full border ${
                        complaint.severity === 'High'
                          ? 'text-red-500 border-red-500'
                          : complaint.severity === 'Mid'
                          ? 'text-yellow-500 border-yellow-500'
                          : 'text-green-500 border-green-500'
                      }`}
                    >
                      {complaint.severity}
                    </span>
                  </td>
                  <td className="border-b border-gray-300 py-2 px-4">
                    <button
                      onClick={() => markAsSolved(complaint.problemId)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Mark as Solved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
