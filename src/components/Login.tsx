// src/components/Login.tsx
"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";  // Using ShadCN
import { Button } from "@/components/ui/button"; // Using ShadCN

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Login;
