"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();

  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || "Failed to sign in");
    }
    return data;
  };

  const register = async (name, email, password, photoURL) => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoURL,
    });
    if (error) {
      console.error("Sign up error full detail:", error);
      console.error("Error Message:", error.message);
      console.error("Error Status:", error.status);
      console.error("Error Status Text:", error.statusText);
      
      const errorMessage = error.message || error.code || "Registration failed. Please check your database connection or try again.";
      throw new Error(errorMessage);
    }
    return data;
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const logout = async () => {
    await authClient.signOut();
    router.push("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user: session?.user || null, 
      loading: isPending, 
      login, 
      register, 
      loginWithGoogle, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
