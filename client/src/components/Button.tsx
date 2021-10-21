import { FC } from "react";
import styles from "../styles/Button.module.css";

interface Props {
    className?: string;
    onClick: () => any;
    disabled?: boolean;
}

const Button: FC<Props> = ({
    children,
    className = "",
    onClick,
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.Button} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
