

import '@/presentation/styles/login/form.css'

export default function Form() {
    return (
        <>
            <form className='form'>
                <h1>Iniciar sesión</h1>
                <input type="email" placeholder="Correo electronico *" />
                <input type="password" placeholder="Contraseña *" />
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    )
}