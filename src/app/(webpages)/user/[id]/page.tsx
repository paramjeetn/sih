"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const ProblemDetails = () => {
  const { id } = useParams();

  // Simulate fetching data based on the problem ID
  const complaintDetails = {
    id,
    pnr: 22,
    complaint: 'text',
    date: '23/01/22',
    status: 'Resolved',
    description: 'Detailed description of the complaint goes here...',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Complaint Details</h1>
      <p><strong>Problem ID:</strong> {complaintDetails.id}</p>
      <p><strong>PNR:</strong> {complaintDetails.pnr}</p>
      <p><strong>Date:</strong> {complaintDetails.date}</p>
      <p><strong>Status:</strong> {complaintDetails.status}</p>
      <p><strong>Description:</strong> {complaintDetails.description}</p>
    </div>
  );
};

export default ProblemDetails;
