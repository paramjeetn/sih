"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Complaint {
  problemId: number;
  pnr: number;
  complaint: string;
  date: string;
  severity: 'High' | 'Mid' | 'Low';
  description?: string;
}

interface ComplaintContextType {
  complaint: Complaint | null;
  setComplaint: (complaint: Complaint) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const useComplaint = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaint must be used within a ComplaintProvider');
  }
  return context;
};

export const ComplaintProvider = ({ children }: { children: ReactNode }) => {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  return (
    <ComplaintContext.Provider value={{ complaint, setComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};
