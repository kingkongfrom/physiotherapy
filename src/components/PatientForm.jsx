import {useNavigate} from 'react-router-dom';
import {toast, Toaster} from "react-hot-toast";


const PatientForm = ({formData, setFormData, setFormErrors, insertData, setCurrentStep}) => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        let formattedValue = value;

        if (name === 'phone') {
            const phoneNumber = value.replace(/\D/g, ''); // Remove non-digit characters from the input value

            formattedValue = phoneNumber.replace(/(\d{4})(\d{0,4})/, (_, first, second) => {
                if (second) {
                    return `${first}${second}`;
                }
                return first;
            });
        }

        setFormData((prevFormData) => ({ ...prevFormData, [name]: formattedValue }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validateForm(formData);

        if (Object.keys(errors).length !== 0) {
            console.log("Error detected " + JSON.stringify(errors));
            toast.error(JSON.stringify(errors));
            setFormErrors(errors);
        } else {
            console.log('Inserting data...');
            insertData();
            toast.success('Su cita fue programada!');
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.fullName || !data.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }

        if (!data.email || !data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (!data.phone || !data.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!isValidPhone(data.phone)) {
            errors.phone = 'Invalid phone number format';
        }


        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^\d{8}$/;
        return phoneRegex.test(phone);
    };

    const resetForm = () => {
        setFormData({fullName: '', email: '', phone: ''});
        setFormErrors({});
        setCurrentStep(1);
    };

    const isAnyFieldEmpty = () => {

        return !formData.fullName || !formData.email || !formData.phone;

    };

    return (
        <div>
            <Toaster/>
            <h2 className="title">Informacion de contacto</h2>
            <form className="patient-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        className=""
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData ? formData.fullName : ''}
                        placeholder=" "
                        onChange={handleChange}
                    />
                    <label htmlFor="fullName">Nombre completo</label>
                </div>

                <div className="form-group">
                    <input
                        className=""
                        id="email"
                        name="email"
                        type="email"
                        value={formData ? formData.email : ''}
                        placeholder=" "
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-group">
                    <input
                        className=""
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData ? formData.phone : ''}
                        placeholder=" "
                        onChange={handleChange}
                    />
                    <label htmlFor="phone">Numero de telefono</label>
                </div>

                <div className="button-group">
                    <button type="button" className="btn btn-secondary cancel" onClick={resetForm}>
                        Cancelar
                    </button>
                    <button type="submit" className={isAnyFieldEmpty() ? "btn disabled" : "btn btn-primary"} disabled={isAnyFieldEmpty()}>
                        Reservar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
