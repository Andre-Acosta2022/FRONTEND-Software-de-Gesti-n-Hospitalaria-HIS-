// infrastructure/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getKeycloakInstance } from './keycloak';


const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);

  useEffect(() => {
    const keycloakInstance = getKeycloakInstance();
    keycloakInstance.init({ onLoad: 'login-required' }).then(authenticated => {
      setKeycloak(keycloakInstance);
      setAuthenticated(authenticated);

      if (authenticated && requiredRole) {
        // Verifica si el usuario tiene el rol requerido
        setHasRequiredRole(keycloakInstance.hasRealmRole(requiredRole));
      }
    });
  }, [requiredRole]);

  if (keycloak === null) {
    return <div>Loading...</div>;  // Muestra algo mientras Keycloak se inicializa
  }

  if (!authenticated) {
    return <Navigate to="/login" />;  // Redirige si no está autenticado
  }

  if (requiredRole && !hasRequiredRole) {
    return <Navigate to="/unauthorized" />;  // Redirige si no tiene el rol necesario
  }

  // Si el usuario está autenticado y tiene el rol requerido, permite el acceso a la ruta
  return element;
};

export default ProtectedRoute;
