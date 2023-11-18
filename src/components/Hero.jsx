import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyles = {
        margin: "1rem",
        color: isHovered ? "#fff" : "#0A6E7C",
        fontSize: "1rem",
        fontWeight: "700",
        padding: "0.7rem 1.4rem",
        backgroundColor: isHovered ? "#0A6E7C" : "#fff",
        borderRadius: "5px",
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Dra. Priscilla Rodriguez</h1>
            <h3 style={styles.h3}>
                Dedicated to patient care and wellness for the entire family.
            </h3>
            <Link
                to="/booking"
                style={buttonStyles}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Reserva tu Cita
            </Link>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "91vh",
        width: "100%",
        opacity: "0.9",
        backgroundPosition: "30% 35%",
        backgroundImage: "url(https://fqpnunykkdxvsmgpebdq.supabase.co/storage/v1/object/public/site-images/hero.jpg)",
    },
    h1: {
        fontSize: "1.85rem",
        fontWeight: "700",
        color: "#fff",
    },
    h3: {
        width: "13rem",
        textAlign: "center",
        color: "#fff",
        fontSize: "0.9rem",
    },
};

export default Hero;
