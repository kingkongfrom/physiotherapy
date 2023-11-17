import supabase from "../services/supabase";
import { useState } from "react";
import CustomDatePicker from "../components/CustomDayPicker";
import CustomTimePicker from "../components/CustomTimePicker";
import PatientForm from "../components/PatientForm";

const Booking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ fullName: "", email: "", phone: "" });
    const [currentStep, setCurrentStep] = useState(1);

    const insertData = async () => {

        if (selectedDate && selectedTime && formData.fullName && formData.email && formData.phone) {

            try {
                const { error } = await supabase
                    .from('appointments')
                    .insert([
                        {
                            date: selectedDate,
                            time: selectedTime,
                            fullName: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                        }
                    ]);
                if (error) {
                    throw error;
                }


            } catch (error) {
                console.error('Error inserting data:', error.message); // Log if any error occurs during insertion
            }
        } else {
            console.log('Missing data for insertion. Aborting.'); // Log if the condition isn't met
        }
    };


    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const isDatePickerStepComplete = selectedDate !== null;
    const isTimePickerStepComplete = selectedDate !== null && selectedTime !== null;
    const isFormStepComplete =
        selectedDate !== null && selectedTime !== null &&
        formData.fullName !== "" && formData.email !== "" && formData.phone !== "";

    const isNextButtonDisabled = currentStep === 1 ? !isDatePickerStepComplete :
        currentStep === 2 ? !isTimePickerStepComplete : !isFormStepComplete;

    return (
        <div className="booking-container">
            {currentStep === 1 && (
                <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            )}

            {currentStep === 2 && selectedDate && (
                <CustomTimePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setSelectedTime={setSelectedTime}
                />
            )}

            {currentStep === 3 && selectedDate && selectedTime && (
                <PatientForm
                    formData={formData}
                    setFormData={setFormData}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    insertData={insertData}
                    setCurrentStep={setCurrentStep}
                />
            )}
            {currentStep === 2 && selectedDate && (
                <div className="mb-8 flex items-center">
        <span className="text-lg mr-2">
            {selectedDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}
        </span>

                </div>
            )}
            {currentStep < 3 && (
                <div className="button-container">
                    {currentStep > 1 && (
                        <button className="btn btn-secondary back" onClick={handlePrevStep}>
                            &#10096; Atrás
                        </button>
                    )}

                    <button
                        className={`btn btn-primary next ${isNextButtonDisabled ? 'disabled' : ''}`}
                        onClick={handleNextStep}
                        disabled={isNextButtonDisabled}
                    >
                        Continuar &#10097;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Booking;
