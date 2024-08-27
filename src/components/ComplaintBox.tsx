"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ComplaintBox = () => {
  const [isOtpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [pnr, setPnr] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [fileError, setFileError] = useState("");

  const validFileTypes = [
    "application/pdf", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "audio/mpeg", // .mp3
    "video/mp4", // .mp4
    "image/jpeg", // .jpeg, .jpg
    "image/png" // .png
  ];

  const handleGetOtpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission and page refresh
    if (isMobileValid) {
      setOtpDialogOpen(true);
      setOtp("");
      setOtpValid(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {  // Allow only numbers and max of 5 digits
      setOtp(value);
      setOtpValid(value.length === 5);
    }
  };

  const handlePnrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }
    setPnr(value);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }
    setMobileNumber(value);
    setIsMobileValid(value.length === 10); // Check if the mobile number is exactly 10 digits
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setDetails("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) { // 1 MB in bytes
        setFileError("File size exceeds 1 MB. Please upload a smaller file.");
        e.target.value = ""; // Clear the file input
      } else if (!validFileTypes.includes(selectedFile.type)) {
        setFileError("Invalid file type. Please upload a PDF, DOCX, MP3, MP4, JPEG, JPG, or PNG file.");
        e.target.value = ""; // Clear the file input
      } else {
        setFileError(""); // Clear any previous errors
      }
    }
  };

  const handleSubmitOtp = () => {
    if (otpValid) {
      // Store the OTP in local state or send it to the backend when needed
      console.log("OTP submitted:", otp);
      setOtpDialogOpen(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpDialogOpen) {
      timer = setTimeout(() => {
        if (!otpValid) {
          alert("OTP entry time has expired. Please try again.");
          setOtpDialogOpen(false);
        }
      }, 120000); // 2 minutes in milliseconds
    }
    return () => clearTimeout(timer);
  }, [isOtpDialogOpen, otpValid]);

  return (
    <div className="bg-white shadow-md p-6 rounded-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Grievance Detail</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mobile No.</label>
          <Input
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            className="w-full"
          />
          <Button
            className="mt-2"
            onClick={handleGetOtpClick}
            disabled={!isMobileValid} // Disable button if mobile number is not valid
          >
            Get OTP
          </Button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Journey Details</label>
          <Input
            type="text"
            placeholder="Enter your PNR No."
            value={pnr}
            onChange={handlePnrChange}
            className="mt-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Type</label>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">{type === "complaint" ? "Complaint Details" : "Suggestion Details"}</label>
            <Textarea
              placeholder={`Enter your ${type} details here`}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full h-32"
              rows={5}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Incident Date</label>
          <Input
            type="datetime-local"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Upload File</label>
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.mp3,.mp4,.jpeg,.jpg,.png"
            className="w-full"
          />
          {fileError && <p className="text-red-600 mt-2">{fileError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Grievance Description</label>
          <Textarea placeholder="Describe your grievance here" className="w-full" />
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Submit</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </form>

      {/* OTP Dialog */}
      <Dialog open={isOtpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>Please enter the 5-digit OTP sent to your mobile number.</DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            className="w-full mb-4"
          />
          <DialogClose asChild>
            <Button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSubmitOtp}
              disabled={!otpValid}
            >
              Submit OTP
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintBox;
