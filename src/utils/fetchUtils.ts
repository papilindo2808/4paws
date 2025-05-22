import axiosClient from './axiosClient'; // Importa la instancia de axios

// Función para realizar solicitudes HTTP con autenticación utilizando axios
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
    // Realiza la solicitud HTTP con axiosClient
    const response = await axiosClient({
      url, // URL de la solicitud
      method: options.method || 'GET', // Método HTTP (GET por defecto)
      data: options.body, // Cuerpo de la solicitud
      headers: options.headers ? Object.fromEntries(new Headers(options.headers)) : undefined, // Encabezados personalizados
    });

    // Devuelve los datos de la respuesta
    return response.data;
  } catch (error: any) {
    // Lanza un error con el mensaje proporcionado por el servidor o un mensaje genérico
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};
