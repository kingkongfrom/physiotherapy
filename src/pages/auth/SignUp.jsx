import {Fragment, useState, useEffect} from 'react';
import supabase from '../../services/supabase.js';
import {toast, Toaster} from 'react-hot-toast';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data, error} = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        fullName: formData.fullName,
                    },
                },
            });

            if (error) {
                throw error;
            }

            // Check if the sign-up was successful
            if (data) {
                toast.success(`Un correo fue enviado a ${formData.email}, por favor revisa tu bandeja`, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#062906',
                    },
                    iconTheme: {
                        primary: '#1A9D29',
                        secondary: '#FFFAEE',
                    },
                });
            }

        } catch (error) {
            console.error('Error signing up:', error);

            if (error.code === 'P1001' || error.message.includes('Email rate limit exceeded')) {
                toast.error('Demasiados intentos. Intenta de nuevo mas tarde.');
            } else if (error.code === '23505' || error.message.includes('unique constraint')) {
                toast.error(`${formData.email} ya existe. Por favor usa otra direccion de correo.`);
            } else {
                toast.error('Se produjo un error. Intenta de nuevo mas tarde.');
            }
        }
    };

    useEffect(() => {
        console.log(formData); // Log the updated formData whenever it changes
    }, [formData]);

    const [isPlaceholderUp, setIsPlaceholderUp] = useState({
        email: false,
        password: false,
    });

    const handleFocus = (e) => {
        const {name} = e.target;
        setIsPlaceholderUp((prevState) => ({
            ...prevState,
            [name]: true,
        }));
    };

    const handleBlur = (e) => {
        const {name, value} = e.target;
        if (value === '') {
            setIsPlaceholderUp((prevState) => ({
                ...prevState,
                [name]: false,
            }));
        }
    };

    return (
        <Fragment>
            <div>
                <Toaster/>
            </div>
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 className="login-title">Registrar cuenta</h2>
                    <div className="input-container">
                        <input
                            placeholder=" "
                            name="fullName"
                            className={isPlaceholderUp.fullName ? 'active' : ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <label className={isPlaceholderUp.fullName ? 'up' : ''}>Nombre completo</label>
                    </div>
                    <div className="input-container">
                        <input
                            placeholder=" "
                            type="email"
                            name="email"
                            className={isPlaceholderUp.email ? 'active' : ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <label className={isPlaceholderUp.email ? 'up' : ''}>Email</label>
                    </div>
                    <div className="input-container">
                        <input
                            placeholder=" "
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            className={isPlaceholderUp.password ? 'active' : ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <label className={isPlaceholderUp.password ? 'up' : ''}>Contraseña</label>
                    </div>
                    <button style={styles.button} type="submit">Submit</button>
                </form>
            </div>
        </Fragment>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
    },
    form: {
        width: '100%',
        maxWidth: '300px',
    },
    input: {
        padding: '5px',
        marginBottom: '10px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        width: '100%',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default SignUp;
