"use client";
 
import { privateAxios, publicAxios } from "@/components/axiosInstance/axios";
import { createContext, useContext, useEffect, useState } from "react";
 
interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  login: (credential: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}
 
// Default value for context (used by createContext)
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
};
 
//   create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);
 
// custom hook to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }
  return context;
};
 
// provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // console.log("Inside auth context", user);
    useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true); // Start loading
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const { data } = await privateAxios.get("/users/get-me");
          // console.log(data)
          setUser(data?.data);
        } catch (error) {
          // localStorage.removeItem("authToken");
          setUser(null);
          // console.log("Auth error", error);
        }
      }
      setIsLoading(false); // End loading (always runs)
    };

    checkUser();
  }, []);

 
  // Login method
  const login = async (credentials: { email: string; password: string }) => {
    // console.log("Logging from context:", credentials);
    setIsLoading(true);
    try {
      const response = await publicAxios.post("/users/login", credentials);
 
      const authorization = response.data;
      localStorage.setItem("authToken", authorization.token);
      setUser(authorization?.user);
      return authorization;
      
    } catch (error: any) {

      console.log(error)
      setError(
        "Error from login: " +
          (error?.response?.data?.message || "Unknown error")
      );
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
       
  const logout = async () => {
    setIsLoading(true);
    try {
      // await privateAxios.post("/users/logout");
      setUser(null);
      localStorage.removeItem("authToken");
    } catch (error) {
      setError(`Error from logout: ${error} `);
    } finally {
      setIsLoading(false);
    }
  };
 
  // auth info
  const authInfo: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    logout,
  };
 
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
export default AuthProvider;