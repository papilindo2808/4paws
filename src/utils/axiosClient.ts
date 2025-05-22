import axios from 'axios';

// Crear una instancia de axios con configuración predeterminada
const axiosClient = axios.create({
  baseURL: 'https://fourpaws-back.onrender.com', // URL base actualizada para las solicitudes al backend
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido predeterminado para las solicitudes
  },
});

// Función para procesar las URLs de las imágenes
const processImageUrl = (url: string | null | undefined): string => {
  if (!url) return '/placeholder.svg';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return `https://fourpaws-back.onrender.com${url}`;
  return url;
};

// Interceptor para agregar el token de autenticación a las solicitudes
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Agregar el token al encabezado de autorización
  }
  // Si es FormData, no forzar Content-Type, dejar que el navegador lo ponga
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

// Interceptor para procesar las respuestas
axiosClient.interceptors.response.use(
  (response) => {
    // Solo procesar URLs de imágenes en respuestas de animales
    if (response.config.url?.includes('/api/animals')) {
      if (response.data) {
        if (Array.isArray(response.data)) {
          response.data = response.data.map(item => {
            if (item.imagenUrl) {
              item.imagenUrl = processImageUrl(item.imagenUrl);
            }
            return item;
          });
        } else if (response.data.imagenUrl) {
          response.data.imagenUrl = processImageUrl(response.data.imagenUrl);
        }
      }
    }
    return response;
  },
  (error) => {
    // Solo eliminar el token y redirigir si es un error de autenticación (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    // Para errores 403 (Forbidden), solo propagar el error sin eliminar el token
    return Promise.reject(error);
  }
);

export default axiosClient;
