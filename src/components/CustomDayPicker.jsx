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

    // Function to check if a day is Sunday (0 represents Sunday)
    const isSunday = (day) => {
        return day.getDay() === 0;
    };

    return (
        <div>
            <h2 className="title">Elige el día de tu cita</h2>
            <DayPicker
                selected={selectedDate}
                onDayClick={handleDateChange}
                disabled={(day) => isPastDay(day) || isSunday(day)} // Disable past days and Sundays
            />
        </div>
    );
};

export default CustomDatePicker;
