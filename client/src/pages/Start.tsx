import { FC } from "react";
import Button from "../components/Button";
import Container from "../wrappers/Container";
import styles from "../styles/StartPage.module.css";
import { useUserLocation } from "../lib/geolocation";

interface Props {
    showAttractions: () => void;
}

const StartPage: FC<Props> = ({ showAttractions }) => {
    const { data: userLocation, init: getUserLocation } = useUserLocation();

    return (
        <Container className={styles.container}>
            <Container className={styles.welcome}>
                <h1>ברוך הבא</h1>
                <Dialog />
            </Container>
            <Container className={styles.buttonContainer}>
                <Button onClick={getUserLocation}>מצא את המיקום שלי</Button>
                <Button disabled={!userLocation} onClick={showAttractions}>
                    הצג אטרקציות קרובות
                </Button>
            </Container>
        </Container>
    );
};

const Dialog = () => {
    const { data, error, loading } = useUserLocation();

    if (loading)
        return (
            <Container className={styles.location}>
                <p>ממתין...</p>
            </Container>
        );

    if (error)
        return (
            <Container className={styles.location}>
                <h2>שגיאה</h2>
                <p dir="ltr">{error.message}</p>
            </Container>
        );

    if (data)
        return (
            <Container className={styles.location}>
                <h2>המיקום שלך</h2>
                <p>
                    Latitude: {data.latitude.toFixed(6)}
                    <br /> Longitude: {data.longitude.toFixed(6)}
                </p>
                <p>רמת דיוק: {data.accuracy.toFixed()} מ'</p>
            </Container>
        );

    return null;
};

export default StartPage;
