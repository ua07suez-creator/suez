import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Client, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@shared/customs-types';

interface AuthContextType {
  user: User | null;
  client: Client | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // التحقق من الرمز المميز المحفوظ عند تحميل التطبيق
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // تسجيل الدخول
  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.user && data.token) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        if (data.client) {
          setClient(data.client);
        }
      }

      return data;
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      return {
        success: false,
        message: 'حدث خطأ في الاتصال'
      };
    }
  };

  // التسجيل
  const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: RegisterResponse = await response.json();
      return result;
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      return {
        success: false,
        message: 'حدث خطأ في الاتصال'
      };
    }
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setClient(null);
  };

  // تحديث بيانات المستخدم
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          if (data.client) {
            setClient(data.client);
          }
        } else {
          // الرمز المميز غير صالح
          localStorage.removeItem('auth_token');
        }
      } else {
        // خطأ في الخادم أو الرمز المميز غير صالح
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('خطأ في تحديث بيانات المستخدم:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    client,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook لاستخدام AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth يجب أن يستخدم داخل AuthProvider');
  }
  return context;
};
