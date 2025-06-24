import Header from '@/presentation/shared/components/header'
import Form from '@/presentation/components/login/form'
import '@/presentation/styles/login/login.css'


export default function Login() {
    return (
        <div className="login" >
            <div className='login__form'>
                <Form />
            </div>
        </div>
    )
}