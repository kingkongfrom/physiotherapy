import Calendar from "../components/Calendar.jsx";
import styles from "./AppointmentsCalendar.module.css"

const AppointmentsCalendar = () => {
    return (
        <div className={styles.container}>
            <Calendar />
        </div>
    );
}
export default AppointmentsCalendar;
