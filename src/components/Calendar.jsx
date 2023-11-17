import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import supabase from "../services/supabase";

const FullCalendarComponent = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data, error } = await supabase.from('appointments').select('*');
                if (error) {
                    throw error;
                }
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={appointments.map((appointment) => ({
                    id: appointment.id,
                    title: appointment.fullName,
                    start: `${appointment.date}T${appointment.time}`,
                }))}
                eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: 'short' }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
            />
        </div>
    );
};

export default FullCalendarComponent;
