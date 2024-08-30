// src/components/Footer.tsx

"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLogin from '@/components/AdminLogin'; // Adjusted path to match your structure

const Footer = () => {
  const [isAdminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  const toggleAdminLoginModal = () => {
    setAdminLoginModalOpen(!isAdminLoginModalOpen);
  };

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div>
        &copy; 2024 RAIL MADAD. All rights reserved. |{' '}
        <Button variant="link" onClick={toggleAdminLoginModal} className="text-white underline">
          Admin Login
        </Button>
      </div>

      <Dialog open={isAdminLoginModalOpen} onOpenChange={setAdminLoginModalOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <AdminLogin />
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
