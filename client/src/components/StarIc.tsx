import { FC } from "react";
import styles from "../styles/StarIc.module.css";

interface Props {
    active: boolean;
}

const StarIc: FC<Props> = ({ active = false }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            className={`${styles.star} ${active ? styles.active : ""}`}
        >
            <g transform="translate(-381.155 -180.5)">
                <path
                    id="Path_7"
                    data-name="Path 7"
                    d="M192.319,213.987l3.863,8.229,8.637,1.32-6.25,6.406,1.475,9.045-7.725-4.27-7.725,4.27,1.475-9.045-6.25-6.406,8.637-1.32Z"
                    transform="translate(201.336 -33.487)"
                />
                <path
                    id="Path_7_-_Outline"
                    data-name="Path 7 - Outline"
                    d="M192.319,218.694l-2.052,4.372a2,2,0,0,1-1.508,1.127l-4.79.732,3.532,3.62a2,2,0,0,1,.542,1.719l-.812,4.98,4.121-2.278a2,2,0,0,1,1.935,0l4.121,2.278-.812-4.98a2,2,0,0,1,.542-1.719l3.532-3.62-4.79-.732a2,2,0,0,1-1.508-1.127l-2.052-4.372m0-4.707,3.863,8.229,8.637,1.32-6.25,6.406,1.475,9.045-7.725-4.27-7.725,4.27,1.475-9.045-6.25-6.406,8.637-1.32Z"
                    transform="translate(201.336 -33.487)"
                    className={styles.stroke}
                />
            </g>
        </svg>
    );
};

export default StarIc;
