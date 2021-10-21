import { FC, useState } from "react";
import styles from "../styles/Accordion.module.css";

interface Props {
    attractions: Array<any>;
}

const Accordion: FC<Props> = ({ attractions }) => {
    return (
        <ul className={styles.list}>
            {attractions.map((a, i) => {
                return (
                    <li
                        key={a.id + a.name}
                        style={{ animationDelay: `${100 * i}ms` }}
                    >
                        <AccordionEntry data={a} />
                    </li>
                );
            })}
        </ul>
    );
};

interface EntryProps {
    data: any;
}

const AccordionEntry: FC<EntryProps> = ({ data }) => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active);
    };

    return (
        <div className={`${styles.entry} ${active ? styles.active : ""}`}>
            <div className={styles.header} onClick={clickHandler}>
                <div className={styles.openIc}>i</div>
                <div className={styles.name}>{data.name}</div>
                <div className={styles.distance}>
                    {data.distance.toFixed(1)} ק"מ
                </div>
                <div
                    className={styles.favoritesIc}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("s");
                    }}
                >
                    s
                </div>
            </div>
            <section className={styles.details}>
                <div>
                    <h4>שעות פעילות</h4>
                    <p>{data.openingHours}</p>
                </div>
                <div>
                    <h4>כתובת</h4>
                    <p>{data.address}</p>
                    <a href={data.website}>לינק לאתר האטרקציה</a>
                </div>
            </section>
        </div>
    );
};

export default Accordion;
