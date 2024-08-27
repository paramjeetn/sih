"use client";

import React, { useState } from 'react';
import CustomModal from './CustomModal';
import { Button } from './ui/button';

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div>
        &copy; 2024 RAIL MADAD. All rights reserved. |{' '}
        <Button variant="link" onClick={toggleModal} className="text-white underline">
          FAQ
        </Button>
      </div>
      <CustomModal isOpen={isModalOpen} toggleModal={toggleModal}>
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="mb-4">Here are some common questions and answers...</p>
      </CustomModal>
    </footer>
  );
};

export default Footer;
