import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';  // Usamos keycloak para obtener roles
import LOGO from '@/assets/image/logo.webp';
import '@/presentation/styles/common/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const { keycloak, initialized } = useKeycloak();  // Obtener la instancia de Keycloak
  const [roles, setRoles] = useState({ isSuperAdmin: false, isUser: false });

  useEffect(() => {
    if (initialized && keycloak) {
      const isSuperAdmin = keycloak.hasRealmRole('superadmin');  // Verificar si es superadmin
      const isUser = keycloak.hasRealmRole('user');  // Verificar si es un usuario
      setRoles({ isSuperAdmin, isUser });
    }
  }, [initialized, keycloak]);  // Solo ejecutar cuando Keycloak esté inicializado

  // Lista de enlaces que se mostrarán según el rol
  const List = [
    {
      id: 1,
      name: 'Medicos',
      link: '/medicos',
      dropdown: [
        { id: 1, name: 'Especialidades', link: '/especialidades' }
      ]
    },
    {
      id: 2,
      name: 'Pacientes',
      link: '/pacientes',
      dropdown: [
        { id: 1, name: 'Añadir pacientes', link: '/anadirpacientes' },
        { id: 2, name: 'Seguro Medico', link: '/seguromedico' }
      ]
    },
    {
      id: 3,
      name: 'Turno',
      link: '/turno',
    },
    {
      id: 4,
      name: 'Citas',
      link: '/citas',
    },
    {
      id: 5,
      name: 'Facturación',
      link: '/facturacion',
    },
    // Ruta de clínica solo visible para el superadmin
    roles.isSuperAdmin && {
      id: 6,
      name: 'Clínica',
      link: '/clinica',
    },
    {
      id: 7,
      name: 'Informes',
      link: '/informes',
    }
  ].filter(Boolean);  // Filtra los elementos que sean falsos (en este caso la ruta de Clínica si no es superadmin)

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout(); // Método para cerrar sesión de Keycloak
    }
  };

  return (
    <div className="header">
      <div className="header__navbar">
        <div className="header__logo">
          <img src={LOGO} alt="logo__header" />
        </div>
        <div className="header__navbar--list">
          <nav>
            <ul>
              {List.map((item) => (
                <li key={item.id} className="header__navbar--container">
                  <Link to={item.link} className="header__navbar--style">
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <ul className="header__navbar--menu">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.id}>
                          <Link to={subItem.link}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="header__button">
        {keycloak?.authenticated ? (
          <button onClick={handleLogout}>Cerrar sesión</button> // Botón de logout
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </div>
    </div>
  );
}
