import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Function to check if a day is in the past
    const isPastDay = (day) => {
        const today = new Date();
        const isPast = day < today;

        return isPast;
    };



    return (
        <div>
            <h2 className="title">Elige el día de tu cita</h2>
            <DayPicker
                selected={selectedDate}
                onDayClick={handleDateChange}
                disabled={isPastDay} // Pass a custom function to disable past days
            />
        </div>
    );
};

export default CustomDatePicker;
