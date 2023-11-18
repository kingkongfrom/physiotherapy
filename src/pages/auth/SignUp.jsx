import { Fragment, useState, useEffect } from 'react';
import supabase from '../../services/supabase.js';
import { toast, Toaster } from 'react-hot-toast';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
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
            toast.success('Please check your email.', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up. Please try again.');
        }
    };

    useEffect(() => {
        console.log(formData); // Log the updated formData whenever it changes
    }, [formData]);

    return (
        <Fragment>
            <div>
                <Toaster />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                />
                <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
};

export default SignUp;
