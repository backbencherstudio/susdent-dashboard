"use client";

import { privateAxios, publicAxios } from "@/components/axiosInstance/axios";
import { storage } from "@/lib/storage";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";

type Role = "admin" | "user" | string;

type AuthUser = {
  id: string;
  role: Role;
  email: string;
  name?: string;
  date_of_birth?: string | Date;
  imageUrl?: string;
  address?: string;
  phone_number?: string;
  country?: string;
  state?: string;
  city?: string;
  postal_code?: string;
  bio?: string;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isNotification: any;
  error: any; // you are using JSX sometimes; keep as any/ReactNode
  login: (credential: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  isNotification: null,
  error: null,
  login: async () => { },
  logout: async () => { },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an authProvider");
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isNotification, setIsNotification] = useState<any>(null);

  // ✅ Disable mock auth in production for safety
  const IS_MOCK =
    process.env.NEXT_PUBLIC_MOCK_AUTH === "true" &&
    process.env.NODE_ENV !== "production";

  const MOCK_EMAIL =
    process.env.NEXT_PUBLIC_MOCK_EMAIL ?? "admin@mock.local";
  const MOCK_PASSWORD =
    process.env.NEXT_PUBLIC_MOCK_PASSWORD ?? "admin123";

  const mockUser: AuthUser = {
    id: "mock-admin",
    role: "admin",
    email: MOCK_EMAIL,
    name: "Mock Admin",
  };

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);

      // ✅ In mock mode, DON'T auto-login.
      // Just keep user logged-in IF mock token exists (so refresh works).
      if (IS_MOCK) {
        const token = storage.getItem("authToken");
        if (token === "mock-token") {
          setUser(mockUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
        return;
      }

      const token = storage.getItem("authToken");
      if (token) {
        try {
          const { data } = await privateAxios.get("/users/get-me");
          if (data?.data?.role === "admin") {
            setUser(data?.data);
          } else {
            storage.removeItem("authToken");
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ Mock login with email+pass validation (server can be OFF)
      if (IS_MOCK) {
        const ok =
          credentials.email.trim().toLowerCase() ===
          MOCK_EMAIL.trim().toLowerCase() &&
          credentials.password === MOCK_PASSWORD;

        if (!ok) {
          setUser(null);
          setError("Invalid mock email or password.");
          return;
        }

        const authorization = { token: "mock-token", user: mockUser };
        storage.setItem("authToken", authorization.token);
        setUser(authorization.user);
        return authorization;
      }

      const response = await publicAxios.post("/users/login", credentials);

      const authorization = response.data;
      storage.setItem("authToken", authorization.token);
      setUser(authorization?.user);

      return authorization;
    } catch (error: any) {
      let errorRes = error?.response?.data?.message;

      if (errorRes === "deactivated") {
        errorRes = (
          <>
            Your account is deactivated. Please activate your account to log in.{" "}
            <Link
              href="/auth/active-account"
              className="text-blue-400 underline"
            >
              Activate your account
            </Link>
          </>
        );
      }

      setError(errorRes || "Unknown error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Socket only when NOT mock
  const socket = useMemo(() => {
    if (IS_MOCK) {
      return {
        on: (_: any, __?: any) => { },
        off: (_: any, __?: any) => { },
      } as any;
    }

    return io(process.env.NEXT_PUBLIC_NOTIFICATION_BASE_URL as string, {
      extraHeaders: {
        Auth: storage.getItem("authToken") || "",
      },
    });
  }, [IS_MOCK]);

  const handleNotification = useCallback((payload: any) => {
    setIsNotification(payload);
  }, []);

  useEffect(() => {
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, handleNotification]);

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      storage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const authInfo: AuthContextType = {
    user,
    isLoading,
    isNotification,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
