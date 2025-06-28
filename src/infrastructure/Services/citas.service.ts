// services/citasService.ts
const API_URL = 'http://localhost:8082/api/citas'; // Cambia la URL según tu configuración

// Crear una nueva cita
export const createCita = async (citaData: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citaData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creando la cita:', error);
    throw error;
  }
};

// Buscar paciente por DNI
export const buscarPacientePorDNI = async (dni: string) => {
  try {
    const response = await fetch(`/api/pacientes/dni/${dni}`);
    const data = await response.json();
    return data; // No se define un tipo explícito
  } catch (error) {
    console.error('Error buscando paciente por DNI:', error);
    throw error;
  }
};

// Buscar médico por nombre
export const buscarMedicoPorNombre = async (nombre: string) => {
  try {
    const response = await fetch(`/api/doctores/buscar?nombre=${nombre}`);
    const data = await response.json();
    return data; // Se devuelve cualquier objeto que la API mande
  } catch (error) {
    console.error('Error buscando médico por nombre:', error);
    throw error;
  }
};

// Obtener disponibilidad de un médico en una fecha
export const obtenerDisponibilidadMedico = async (medicoId: number, fecha: string) => {
  try {
    const response = await fetch(`/api/citas/disponibilidad/${medicoId}?fecha=${fecha}`);
    const data = await response.json();
    return data; // Se devuelve cualquier tipo de objeto sin validar
  } catch (error) {
    console.error('Error obteniendo disponibilidad del médico:', error);
    throw error;
  }
};

// Obtener todos los servicios disponibles
export const obtenerServicios = async () => {
  try {
    const response = await fetch('/api/servicios');
    const data = await response.json();
    return data; // Cualquier tipo de datos devuelto por la API
  } catch (error) {
    console.error('Error obteniendo los servicios:', error);
    throw error;
  }
};

// Calcular el monto de un servicio por su ID
export const calcularMonto = async (servicioId: number) => {
  try {
    const response = await fetch(`/api/servicios/${servicioId}/precio`);
    const data = await response.json();
    return data.precio; // Sin validación de tipos
  } catch (error) {
    console.error('Error calculando el monto del servicio:', error);
    throw error;
  }
};
