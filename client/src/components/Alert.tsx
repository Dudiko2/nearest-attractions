import { FC } from "react";
import styles from "../styles/Alert.module.css";
import Container from "../wrappers/Container";

interface Props {
    className?: string;
    show: boolean;
}

const Alert: FC<Props> = ({ children, show, className = "" }) => {
    return (
        <Container
            className={`${styles.container} ${className} ${
                show ? styles.active : ""
            }`}
        >
            <div className={`${styles.alert}`}>{children}</div>
        </Container>
    );
};

export default Alert;
