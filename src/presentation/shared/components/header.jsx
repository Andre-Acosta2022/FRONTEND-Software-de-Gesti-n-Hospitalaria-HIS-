import LOGO from '@/assets/image/logo.webp'
import '@/presentation/styles/common/header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    const List = [
        {
            id: 1,
            name: 'Medicos',
            link: '/medicos',
            dropdown: [
                { id: 1, name: 'Listado de medicos', link: '/listademedicos' },
                { id: 2, name: 'Añadir medicos', link: '/anadirmedicos' },
                { id: 3, name: 'Especialidades', link: '/especialidades' }
            ]
        },
        {
            id: 2,
            name: 'Pacientes',
            link: '/pacientes',
            dropdown: [
                { id: 1, name: 'Listado de pacientes', link: '/listadopacientes' },
                { id: 2, name: 'Añadir pacientes', link: '/anadirpacientes' },
                { id: 3, name: 'Seguro Medico', link: '/seguromedico' }
            ]
        },
        {
            id: 3,
            name: 'Servicios',
            link: '/servicios'
        },
        {
            id: 4,
            name: 'Paquetes',
            link: '/paquetes'
        },
        {
            id: 5,
            name: 'Turno',
            link: '/turno'
        },
        {
            id: 6,
            name: 'Consulta',
            link: '/consulta'
        },
        {
            id: 7,
            name: 'Facturacion',
            link: '/facturacion'
        },
         {
            id: 8,
            name: 'Clincia',
            link: '/clinica'
        },
    ];

    return (
        <div className="header">
            <div className="header__navbar">
                <div className="header__logo">
                    <img src={LOGO} alt="logo__header" />
                </div>
                <div className="header__navbar--list">
                    <nav>
                        <ul>
                            {
                                List.map((item) => {
                                    return (
                                        <li key={item.id} className="header__navbar--container">
                                            <Link
                                                to={item.link}
                                                className="header__navbar--style"
                                                aria-label={`Ir a ${item.name}`}
                                            >
                                                {item.name}
                                            </Link>
                                            {item.dropdown && (
                                                <ul className="header__navbar--menu">
                                                    {item.dropdown.map((subItem) => (
                                                        <li key={subItem.id}>
                                                            <Link to={subItem.link}>
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="header__button">
                    <Link to='/login' className="header__button--style">
                        Iniciar Sesion
                    </Link>
            </div>
        </div>
    )
}
