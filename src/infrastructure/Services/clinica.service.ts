// services/clinica.service.ts
const API_URL = 'http://localhost:8081/api/clinicas'; // Cambia la URL según tu configuración

// Obtener todas las clínicas
export const getClinicas = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clinica:', error);
    throw error;
  }
};

// Obtener una clínica por ID
export const getClinicaById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clinica:', error);
    throw error;
  }
};

// Crear una nueva clínica
export const createClinica = async (clinica: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clinica),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating clinica:', error);
    throw error;
  }
};

// Actualizar una clínica existente
export const updateClinica = async (id: number, clinica: any) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clinica),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating clinica:', error);
    throw error;
  }
};

// Eliminar una clínica
export const deleteClinica = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting clinica:', error);
    throw error;
  }
};