import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
  const { keycloak } = useKeycloak();

  // Verificamos si el usuario está autenticado y tiene el rol necesario
  if (!keycloak?.authenticated) {
    return <Navigate to="/login" />; // Redirige a login si no está autenticado
  }

  if (requiredRole && !keycloak.hasRealmRole(requiredRole)) {
    return <Navigate to="/" />; // Redirige a inicio si no tiene el rol requerido
  }

  // Usar React.cloneElement para renderizar el elemento con las props adicionales
  return React.cloneElement(element, { ...rest });
};

export default ProtectedRoute;