import {Fragment, useState} from 'react';
import supabase from "../../services/supabase.js";
import {Link, useNavigate} from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

const Login = ({setToken}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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


    const [isPlaceholderUp, setIsPlaceholderUp] = useState({
        email: false,
        password: false,
    });

    const handleBlur = (e) => {
        const {name, value} = e.target;
        if (value === '') {
            setIsPlaceholderUp((prevState) => ({
                ...prevState,
                [name]: false,
            }));
        }
    };

    const handleFocus = (e) => {
        const {name} = e.target;
        setIsPlaceholderUp((prevState) => ({
            ...prevState,
            [name]: true,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const {data, error} = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });



            if (error) {
                throw error;
            }

            setToken(data);
            navigate("/");

        } catch (error) {
            console.error('Error logging in:', error);

            if (error.code === 'P1003' || error.message === 'Invalid login credentials') {
                toast.error('Invalid email or password. Please try again.');
            } else {
                toast.error('Error logging in. Please try again.');
            }
        }
    };

    return (
        <Fragment>
            <div>
                <Toaster/>
            </div>
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 className="login-title">Login</h2>
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
                            className={isPlaceholderUp.password ? 'active' : ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <label className={isPlaceholderUp.password ? 'up' : ''}>Contraseña</label>
                    </div>
                    <button type="submit" style={styles.button}>Submit</button>
                    <Link to="/sign-up">Registrar cuenta</Link>
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
        marginBottom: '20px',
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

export default Login;
