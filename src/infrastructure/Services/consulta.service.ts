// services/clinica.service.ts
const API_URL = 'http://localhost:8082/api/consulta'; // Cambia la URL según tu configuración

// Obtener todas las clínicas
export const getCitas = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching citas:', error);
    throw error;
  }
};

// Obtener una clínica por ID
export const getCitasById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching citas:', error);
    throw error;
  }
};

// Crear una nueva clínica
export const createCitas = async (citas: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citas),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating citas:', error);
    throw error;
  }
};

// Actualizar una clínica existente
export const updateCitas = async (id: number, citas: any) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citas),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating citas:', error);
    throw error;
  }
};

// Eliminar una clínica
export const deleteCitas = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting citas:', error);
    throw error;
  }
};