import { Route, Routes } from 'react-router-dom'
import './App.css'  
import Login from './presentation/pages/LoginPage'
import MedicosPage from './presentation/pages/MedicosPage'
import AñadirMedicosPage from './presentation/components/medico/AñadirMedicosPage'
import EspecialidadesPage from './presentation/components/medico/EspecialidadesPage'
import PacientesPage from './presentation/pages/PacientesPage'
import AñadirPacientesPage from './presentation/components/pacientes/AñadirPacientesPage'
import ServiciosPage from './presentation/pages/ServiciosPage'
import PaquetesPage from './presentation/pages/PaquetesPage'
import React from 'react'
import TurnoPage from './presentation/pages/TurnoPage'
import ConsultaPage from './presentation/pages/ConsultaPage'
import clinicaPage from './presentation/components/clinica/clinicaPage'
import FacturacionPage from './presentation/pages/FacturacionPage'
import Error404 from './presentation/pages/Error404Page'

import Header from '@/presentation/shared/components/header'


function App() {

  return (
    <>
        <Header />
      <Routes>
        <Route path='/' element={<Login to='/login' replace />} />
        <Route path='/login' element={<Login />} />

        {/* Demas Rutas  */}
        {/* medico */}
        <Route path='/medicos' element={<MedicosPage />} />
       <Route path='/listademedicos' element={<MedicosPage />} />
        <Route path='/anadirmedicos' element={<AñadirMedicosPage />} />
        <Route path='/especialidades' element={<EspecialidadesPage />} />
{/* paciente*/}
        <Route path='/pacientes' element={<PacientesPage />} />
        <Route path='/listadopacientes' element={<PacientesPage />} />
        <Route path='/anadirpacientes' element={<AñadirPacientesPage />} />
        <Route path='/seguromedico' element={<seguromedicoPage />} />  

        <Route path='/servicios' element={<ServiciosPage />} />
        <Route path='/paquetes' element={<PaquetesPage />} />
        <Route path='/turno' element={<TurnoPage />} />
        <Route path='/consulta' element={<ConsultaPage />} />
        <Route path='/facturacion' element={<FacturacionPage />} />
         <Route path='/clinica' element={<clinicaPage />} />
        {/* Error 404  */}

        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
