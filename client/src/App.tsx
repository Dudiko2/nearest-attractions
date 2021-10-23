import { useState } from "react";
import Container from "./wrappers/Container";
import styles from "./styles/App.module.css";
import StartPage from "./pages/Start";
import { useUserLocation } from "./lib/geolocation";
import useAttractions from "./hooks/useAttractions";
import AttractionsPage from "./pages/Attractions";
import { AlertProvider } from "./lib/alerts";

function App() {
    const { data: userLocation } = useUserLocation();

    const {
        data: attractions,
        init: getAttractions,
        loading: loadingAttractions,
    } = useAttractions({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
    });
    const [show, setShow] = useState(false);

    return (
        <AlertProvider>
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
                        <AttractionsPage
                            loading={loadingAttractions}
                            attractions={attractions}
                        />
                    )}
                </Container>
            </div>
        </AlertProvider>
    );
}

export default App;
