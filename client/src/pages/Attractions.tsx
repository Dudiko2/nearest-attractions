import { FC } from "react";
import Container from "../wrappers/Container";
import Accordion from "../components/Accordion";
import styles from "../styles/AttractionsPage.module.css";

interface Props {
    attractions: any[];
}

const AttractionsPage: FC<Props> = ({ attractions }) => {
    return (
        <>
            <Container className={styles.attractionsSection}>
                <h1
                    style={{
                        color: "var(--text-dark)",
                        fontSize: "3rem",
                        padding: "2rem 1rem",
                    }}
                >
                    אטרקציות בסביבתך
                </h1>
                <Accordion attractions={attractions} />
            </Container>
            <Container></Container>
        </>
    );
};

export default AttractionsPage;