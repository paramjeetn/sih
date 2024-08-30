// // src/components/Navbar.tsx
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { FiMenu } from "react-icons/fi";
// import { useAuth } from "@/components/AuthProvider";
// import { Button } from "@/components/ui/button";  // Using ShadCN Button component
// import { signOut } from "firebase/auth";  // Importing signOut from Firebase Auth
// import { auth } from "@/lib/firebaseConfig";  // Importing the auth instance
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Login from "@/components/Login";
// import Register from "@/components/Register";

// const Navbar: React.FC = () => {
//   const { user } = useAuth();
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between bg-blue-900 text-white p-4">
//       <div className="flex items-center">
//         <FiMenu className="mr-2" />
//         <img
//           src="/rail-logo.png" // Ensure this path is correct for your image
//           alt="IRCTC Logo"
//           width={50}
//           height={50}
//           className="mr-2"
//         />
//         <span
//           className="text-4xl"
//           style={{ fontFamily: "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif" }}
//         >
//           RAIL MADAD
//         </span>
//       </div>
//       <div className="flex items-center space-x-4">
//         {user ? (
//           <>
//             <div className="flex items-center space-x-2">
//               <span className="text-white">{user.email}</span>
//             </div>
//             <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
//                   Login
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Login</DialogTitle>
//                 </DialogHeader>
//                 <Login />
//               </DialogContent>
//             </Dialog>

//             <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
//                   Sign Up
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Sign Up</DialogTitle>
//                 </DialogHeader>
//                 <Register />
//               </DialogContent>
//             </Dialog>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";  // Using ShadCN Button component
import { signOut } from "firebase/auth";  // Importing signOut from Firebase Auth
import { auth } from "@/lib/firebaseConfig";  // Importing the auth instance
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "@/components/Login";
import Register from "@/components/Register";

const Navbar: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/home'); // Redirect to /home after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-blue-900 text-white p-4">
      <div className="flex items-center">
        <FiMenu className="mr-2" />
        <img
          src="/rail-logo.png" // Ensure this path is correct for your image
          alt="IRCTC Logo"
          width={50}
          height={50}
          className="mr-2"
        />
        <span
          className="text-4xl"
          style={{ fontFamily: "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif" }}
        >
          RAIL MADAD
        </span>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <span className="text-white">{user.email}</span>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <Login />
              </DialogContent>
            </Dialog>

            <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign Up</DialogTitle>
                </DialogHeader>
                <Register />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
