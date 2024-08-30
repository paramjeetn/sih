// src/components/AuthProvider.tsx
"use client";

import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
