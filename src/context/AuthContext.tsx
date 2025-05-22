import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  username: string;
  role: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  birthDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getStoredToken();
      console.log('Initializing auth with token:', token); // Debug log
      
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          console.log('Current user:', currentUser); // Debug log
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        } catch (error) {
          console.error('Error al obtener el usuario actual:', error);
          authService.removeStoredToken();
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const { token, user } = await authService.login(username, password);
      console.log('Login successful:', { token, user }); // Debug log
      
      if (!token || !user) {
        throw new Error('Respuesta inválida del servidor');
      }
      
      authService.setStoredToken(token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      console.error('Login error:', error); // Debug log
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setError(null);
      const { token, user } = await authService.register(userData);
      console.log('Register successful:', { token, user }); // Debug log
      
      if (!token || !user) {
        throw new Error('Respuesta inválida del servidor');
      }
      
      authService.setStoredToken(token);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      console.error('Register error:', error); // Debug log
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out'); // Debug log
    authService.removeStoredToken();
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    error
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
