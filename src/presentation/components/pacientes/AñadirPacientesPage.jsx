import React, { useState } from 'react';
import { createPaciente } from '@/infrastructure/Services/paciente.service.ts'; // Asegúrate de que la ruta del servicio sea correcta

const AñadirPacientesPage = () => {
  const [paciente, setPaciente] = useState({
    nombre: '',
    apellido: '',
    genero: '',
    documentoIdentidad: '',
    telefono: '',
    direccion: '',
    correo: '',
    fechacimiento: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({
      ...paciente,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPaciente = await createPaciente(paciente);
      console.log('Paciente añadido:', newPaciente);
      // Aquí podrías redirigir al listado de pacientes después de añadirlo
    } catch (error) {
      console.error('Error al añadir paciente:', error);
    }
  };

  return (
    <div>
      <h1>Añadir Paciente</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={paciente.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={paciente.apellido}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Género</label>
          <input
            type="text"
            name="genero"
            value={paciente.genero}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Documento de Identidad</label>
          <input
            type="text"
            name="documentoIdentidad"
            value={paciente.documentoIdentidad}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={paciente.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={paciente.direccion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={paciente.correo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechacimiento"
            value={paciente.fechacimiento}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Añadir Paciente</button>
      </form>
    </div>
  );
};

export default AñadirPacientesPage;