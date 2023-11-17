import { Fragment, useEffect, useState } from "react";
import supabase from "../services/supabase";

const TIMES = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const CustomTimePicker = ({ selectedDate, setSelectedTime }) => {
    const [bookedTimes, setBookedTimes] = useState([]);

    useEffect(() => {
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

        fetchBookedTimes();
    }, [selectedDate]);

    const handleTimeChange = (time) => {

        if (!bookedTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const isTimeBooked = (time) => bookedTimes.includes(time.substring(0, 5));

    return (
        <Fragment>
            <div className="">
                <h2 className="title">Elige la hora de tu cita</h2>
                <div className="time-slot-container">
                    {TIMES.map((time) => (
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
