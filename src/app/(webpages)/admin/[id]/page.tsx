"use client";

import React from 'react';
import { useComplaint } from '../../../../lib/ComplaintContext';

const ComplaintDashboard = () => {
  const { complaint } = useComplaint();

  // Custom media data
  const media = {
    image: "/path-to-image.jpg", // Replace with actual image path or URL
    audio: "/path-to-audio.mp3", // Replace with actual audio path or URL
    video: "/path-to-video.mp4", // Replace with actual video path or URL
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-3xl border border-gray-300">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 border-b-2 border-gray-200 pb-4">
          Complaint Dashboard
        </h1>
        
        <div className="space-y-8">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">Problem ID:</span>
            <span className="text-gray-900 mt-2">{complaint.problemId}</span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">Complaint:</span>
            <span className="text-gray-900 mt-2">{complaint.complaint}</span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">PNR:</span>
            <span className="text-gray-900 mt-2">{complaint.pnr}</span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">Date:</span>
            <span className="text-gray-900 mt-2">{complaint.date}</span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">Severity:</span>
            <span
              className={`mt-2 ${
                complaint.severity === 'High'
                  ? 'text-red-600'
                  : complaint.severity === 'Mid'
                  ? 'text-yellow-600'
                  : 'text-green-600'
              } font-medium`}
            >
              {complaint.severity}
            </span>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-600">Description:</span>
            <span className="text-gray-900 mt-2">{complaint.description}</span>
          </div>

          {/* Media Section */}
          <div className="flex flex-col mt-8">
            <span className="font-semibold text-lg text-gray-600">Attached Media:</span>
            <div className="mt-4 space-y-4 border border-dashed border-gray-300 p-4 rounded-lg">
              {media.image && (
                <div>
                  <span className="font-medium text-gray-700">Image:</span>
                  <a href={media.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                    View Image
                  </a>
                </div>
              )}
              {media.audio && (
                <div>
                  <span className="font-medium text-gray-700">Audio:</span>
                  <audio controls className="ml-2 mt-2 w-full">
                    <source src={media.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              {media.video && (
                <div>
                  <span className="font-medium text-gray-700">Video:</span>
                  <video controls className="ml-2 mt-2 w-full max-w-full rounded-lg shadow-md">
                    <source src={media.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDashboard;
