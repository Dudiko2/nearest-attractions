import { FC } from "react";
import Container from "../wrappers/Container";
import Accordion from "../components/Accordion";
import styles from "../styles/AttractionsPage.module.css";

interface Props {
    attractions: any[];
    loading: boolean;
}

const AttractionsPage: FC<Props> = ({ attractions, loading }) => {
    return (
        <>
            <Container className={styles.attractionsSection}>
                <h1>אטרקציות בסביבתך</h1>
                {loading ? (
                    <p>טוען...</p>
                ) : (
                    <Accordion attractions={attractions} />
                )}
            </Container>
            <Container></Container>
        </>
    );
};

export default AttractionsPage;
