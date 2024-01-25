import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};
const signUpFormFields = {
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpPassword2: '',
};

export const LoginPage = () => {
    const { startLogin, startSignUp, errorMessage } = useAuthStore();

    const {
        loginEmail,
        loginPassword,
        onInputChange: onLoginInputChange,
    } = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    };

    const {
        signUpName,
        signUpEmail,
        signUpPassword,
        signUpPassword2,
        onInputChange: onSignUpInputChange,
    } = useForm(signUpFormFields);

    const signUpSubmit = (event) => {
        event.preventDefault();

        if (signUpPassword !== signUpPassword2) {
            Swal.fire(
                'Error en el registro',
                'Las contraseñas deben ser iguales',
                'error'
            );
            return;
        }

        startSignUp({
            name: signUpName,
            email: signUpEmail,
            password: signUpPassword,
        });
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Correo'
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='d-grid gap-2'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Login'
                            />
                        </div>
                    </form>
                </div>

                <div className='col-md-6 login-form-2'>
                    <h3>Registro</h3>
                    <form onSubmit={signUpSubmit}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                name='signUpName'
                                value={signUpName}
                                onChange={onSignUpInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='signUpEmail'
                                value={signUpEmail}
                                onChange={onSignUpInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='signUpPassword'
                                value={signUpPassword}
                                onChange={onSignUpInputChange}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña'
                                name='signUpPassword2'
                                value={signUpPassword2}
                                onChange={onSignUpInputChange}
                            />
                        </div>

                        <div className='d-grid gap-2'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Crear cuenta'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
