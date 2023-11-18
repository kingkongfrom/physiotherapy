import { Fragment, useEffect, useState } from "react";
import supabase from "../services/supabase";

const CustomTimePicker = ({ selectedDate, setSelectedTime }) => {
    const [bookedTimes, setBookedTimes] = useState([]);

    // Define the TIMES array for time slots
    const TIMES = [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const fetchBookedTimes = async () => {
        if (selectedDate) {
            try {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const { data, error } = await supabase
                    .from('appointments')
                    .select('time')
                    .eq('date', formattedDate);

                if (error) {
                    throw error;
                }

                const bookedTimes = data.map(appointment => appointment.time.substring(0, 5));

                setBookedTimes(bookedTimes);
            } catch (error) {
                console.error('Error fetching booked times:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchBookedTimes();
    }, [selectedDate]);

    const handleTimeChange = (time) => {
        if (!bookedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const isTimeBooked = (time) => bookedTimes.includes(time.substring(0, 5));

    // Filter time slots for weekdays (Monday to Friday) and between 7 AM and 6 PM
    // Filter time slots for weekdays (Monday to Friday) and between 7 AM and 6 PM,
// and for weekends (Saturday and Sunday) between 7 AM and 12 PM
    const filteredTimes = TIMES.filter(time => {
        const hour = parseInt(time.split(':')[0]);

        // Check if it's a weekday (Monday to Friday) between 7 AM and 6 PM
        if (selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5) {
            return hour >= 7 && hour <= 18;
        } else if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) { // Check if it's a weekend (Saturday or Sunday)
            return hour >= 7 && hour <= 12;
        }
        return false;
    });

    return (
        <Fragment>
            <div className="">
                <h2 className="title">Elige la hora de tu cita</h2>
                <div className="time-slot-container">
                    {filteredTimes.map((time) => (
                        <button
                            className={`time-slot ${isTimeBooked(time) ? 'booked' : ''}`}
                            onClick={() => handleTimeChange(time)}
                            key={time}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default CustomTimePicker;
