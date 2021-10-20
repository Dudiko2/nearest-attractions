import { useEffect, useState } from "react";
import Accordion from "./components/Accordion";
import Container from "./wrappers/Container";
import styles from "./styles/App.module.css";

function App() {
    const [attractions, setAttractions] = useState<Array<any>>([]);

    console.log(attractions);

    useEffect(() => {
        fetch("/api/attractions?lat=31.771&long=35.217")
            .then((r) => r.json())
            .then((j) => setAttractions(j));
    }, []);

    return (
        <div className={styles.App}>
            <Container fluid>
                <Container className={styles.attractionsSection}>
                    <h1
                        style={{
                            color: "var(--active-text)",
                            fontSize: "3rem",
                            padding: "2rem 1rem",
                        }}
                    >
                        אטרקציות בסביבתך
                    </h1>
                    <Accordion attractions={attractions} />
                </Container>
                <Container></Container>
            </Container>
        </div>
    );
}

export default App;
