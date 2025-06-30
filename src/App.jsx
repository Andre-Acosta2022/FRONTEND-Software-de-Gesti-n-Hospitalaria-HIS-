import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';  // Correcto import de ReactKeycloakProvider
import React, { useState, useEffect } from 'react';
import { getKeycloakInstance } from './infrastructure/Config/keycloak';  // Importar la función para obtener la instancia de Keycloak
import Login from './presentation/pages/LoginPage';
import MedicosPage from './presentation/pages/MedicosPage';
import AñadirMedicosPage from './presentation/components/medico/AñadirMedicosPage';
import EspecialidadesPage from './presentation/components/medico/EspecialidadesPage';
import PacientesPage from './presentation/pages/PacientesPage';
import AñadirPacientesPage from './presentation/components/pacientes/AñadirPacientesPage';
import SeguromedicoPage from './presentation/components/pacientes/seguromedicoPage';
import InformesPage from './presentation/components/informes/InformesPage';
import TurnoPage from './presentation/pages/TurnoPage';
import CitasPage from './presentation/components/citas/CitasPage';
import ClinicasPage from './presentation/components/clinica/clinicaPage';
import AñadirsedePage from './presentation/components/clinica/AñadirsedePage';
import CalendarPage from './presentation/components/turno/calendarPage';
import FacturacionPage from './presentation/pages/FacturacionPage';
import Error404 from './presentation/pages/Error404Page';
import Header from '@/presentation/shared/components/header';
import ProtectedRoute from '@/infrastructure/Config/ProtectedRoute'; // Importar el componente ProtectedRoute

const App = () => {
  const [keycloak, setKeycloak] = useState(null);  // Mantén la instancia de Keycloak en el estado

  useEffect(() => {
    const keycloakInstance = getKeycloakInstance();  // Solo obtener la instancia de Keycloak
    keycloakInstance.init({ 
      onLoad: 'login-required',  // Aseguramos que Keycloak requiera login si el usuario no está autenticado
      checkLoginIframe: false  // Desactivamos el iframe que causa el tiempo de espera
    }).then(authenticated => {
      setKeycloak(keycloakInstance);  // Guardamos la instancia una vez inicializada
    }).catch(error => {
      console.error("Error initializing Keycloak:", error);
    });
  }, []);  // Se ejecuta solo una vez cuando el componente se monta

  // Si Keycloak no está inicializado, muestra un mensaje de carga
  if (!keycloak) {
    return <div>Loading...</div>;
  }

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<TurnoPage />} />

        {/* Medicamentos Routes */}
        <Route path="/medicos" element={<ProtectedRoute element={<MedicosPage />} requiredRole="admin" />} />
        <Route path="/listademedicos" element={<MedicosPage />} />
        <Route path="/anadirmedicos" element={<AñadirMedicosPage />} />
        <Route path="/especialidades" element={<EspecialidadesPage />} />

        {/* Pacientes Routes */}
        <Route path="/pacientes" element={<PacientesPage />} />
        <Route path="/listadopacientes" element={<PacientesPage />} />
        <Route path="/anadirpacientes" element={<AñadirPacientesPage />} />
        <Route path="/seguromedico" element={<SeguromedicoPage />} />

        {/* Turnos */}
        <Route path="/turno" element={<TurnoPage />} />
        <Route path="/calendar" element={<CalendarPage />} />

        {/* Citas */}
        <Route path="/citas" element={<CitasPage />} />

        {/* Facturación */}
        <Route path="/facturacion" element={<FacturacionPage />} />

        {/* Rutas de Clínica (Solo accesibles para superadmin) */}
        <Route path="/clinica" element={<ProtectedRoute element={<ClinicasPage />} requiredRole="superadmin" />} />
        <Route path="/añadirsede" element={<ProtectedRoute element={<AñadirsedePage />} requiredRole="superadmin" />} />

        {/* Informes */}
        <Route path="/informes" element={<InformesPage />} />

        {/* Error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </ReactKeycloakProvider>
  );
};

export default App;
