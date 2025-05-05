
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for users (in a real app, this would be a backend API)
let users: User[] = [
  {
    id: '1',
    name: 'Test',
    email: 'test@mail.com',
  }
];

// Mock function to simulate backend authentication
const authenticateUser = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    // Simulate network request
    setTimeout(() => {
      const user = users.find((u) => u.email === email);
      if (user) {
        // In a real app, we would check the password hash here
        resolve(user);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

// Mock function to simulate user registration
const registerUser = (name: string, email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    // Simulate network request
    setTimeout(() => {
      if (users.some((u) => u.email === email)) {
        resolve(null); // User already exists
      } else {
        const newUser = {
          id: `${users.length + 1}`,
          name,
          email,
        };
        users.push(newUser);
        resolve(newUser);
      }
    }, 500);
  });
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('elearning_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const authenticatedUser = await authenticateUser(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem('elearning_user', JSON.stringify(authenticatedUser));
        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await registerUser(name, email, password);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('elearning_user', JSON.stringify(newUser));
        toast.success('Account created successfully!');
      } else {
        toast.error('User with this email already exists');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elearning_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
