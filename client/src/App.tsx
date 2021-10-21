import { useState } from "react";
import Container from "./wrappers/Container";
import styles from "./styles/App.module.css";
import StartPage from "./pages/Start";
import { useUserLocation } from "./lib/geolocation";
import useAttractions from "./hooks/useAttractions";
import AttractionsPage from "./pages/Attractions";

function App() {
    const { data: userLocation } = useUserLocation();

    const { data: attractions, init: getAttractions } = useAttractions({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });
    const [show, setShow] = useState(false);

    return (
        <div className={styles.App}>
            <Container fluid className={styles.main}>
                {!show && (
                    <StartPage
                        showAttractions={() => {
                            setShow(true);
                            getAttractions();
                        }}
                    />
                )}
                {show && !!userLocation && (
                    <AttractionsPage attractions={attractions} />
                )}
            </Container>
        </div>
    );
}

export default App;
