import { Ubicacion } from '../types/pacienteTypes';

// Datos de ejemplo para Perú
const ubicaciones: Ubicacion[] = [
    { id: 1, nombre: "Lima", tipo: "departamento" },
    { id: 2, nombre: "Arequipa", tipo: "departamento" },
    { id: 3, nombre: "Lima", tipo: "provincia", parentId: 1 },
    { id: 4, nombre: "Callao", tipo: "provincia", parentId: 1 },
    { id: 5, nombre: "Arequipa", tipo: "provincia", parentId: 2 },
    { id: 6, nombre: "Miraflores", tipo: "distrito", parentId: 3 },
    { id: 7, nombre: "Barranco", tipo: "distrito", parentId: 3 },
    { id: 8, nombre: "Yanahuara", tipo: "distrito", parentId: 5 },
];

export const getDepartamentos = async (): Promise<Ubicacion[]> => {
    return ubicaciones.filter(u => u.tipo === 'departamento');
};

export const getProvincias = async (departamentoId: number): Promise<Ubicacion[]> => {
    return ubicaciones.filter(u => u.tipo === 'provincia' && u.parentId === departamentoId);
};

export const getDistritos = async (provinciaId: number): Promise<Ubicacion[]> => {
    return ubicaciones.filter(u => u.tipo === 'distrito' && u.parentId === provinciaId);
};