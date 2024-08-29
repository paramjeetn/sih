// src/app/[webpages]/admin/layout.tsx
import React from 'react';
import { ComplaintProvider } from '../../../lib/ComplaintContext'; // Adjust the path based on your structure

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComplaintProvider>
      {children}
    </ComplaintProvider>
  );
}
