import { FC } from "react";
import styles from "../styles/Container.module.css";

interface Props {
    className?: string;
    fluid?: boolean;
}

const Container: FC<Props> = ({ children, className = "", fluid = false }) => {
    return (
        <div
            className={`${styles.container} ${
                fluid ? styles.fluid : ""
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;
