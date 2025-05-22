import axiosClient from '../utils/axiosClient';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  birthDate: string;
}

interface AuthError {
  message: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axiosClient.post<LoginResponse>('/auth/login', {
        username,
        password,
      });
      console.log('Login response:', response.data); // Debug log
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Respuesta inválida del servidor');
      }
      return response.data;
    } catch (error: any) {
      console.error('Error en login:', error.response?.data); // Debug log
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await axiosClient.post<LoginResponse>('/auth/register', userData);
      console.log('Register response:', response.data); // Debug log
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Respuesta inválida del servidor');
      }
      return response.data;
    } catch (error: any) {
      console.error('Error en register:', error.response?.data); // Debug log
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  },

  async getCurrentUser(): Promise<LoginResponse['user']> {
    try {
      const response = await axiosClient.get<LoginResponse>('/auth/me');
      console.log('GetCurrentUser response:', response.data); // Debug log
      if (!response.data || !response.data.user) {
        throw new Error('Respuesta inválida del servidor');
      }
      return response.data.user;
    } catch (error: any) {
      console.error('Error en getCurrentUser:', error.response?.data); // Debug log
      throw new Error(error.response?.data?.message || 'Error al obtener el usuario actual');
    }
  },

  getStoredToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Stored token:', token); // Debug log
    return token;
  },

  setStoredToken(token: string): void {
    console.log('Setting token:', token); // Debug log
    if (!token) {
      console.error('Attempting to store undefined token');
      return;
    }
    localStorage.setItem('token', token);
  },

  removeStoredToken(): void {
    console.log('Removing token'); // Debug log
    localStorage.removeItem('token');
  }
}; 