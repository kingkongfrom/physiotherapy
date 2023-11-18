
const Hero = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Dra. Priscilla Rodriguez</h1>
            <h3 style={styles.h3}>Dedicated to patient care and wellness for the entire family.</h3>
            <button style={styles.button}>Reserva tu Cita</button>
        </div>
    );
}

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
        fontSize: "0.9rem"
    },
    button: {
        margin: "1rem",
        color: "#0A6E7C",
        fontSize: "1rem",
        fontWeight: "700",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        borderRadius: "5px",
    },
}
export default Hero;
