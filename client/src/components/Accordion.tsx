import { FC, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAlert } from "../lib/alerts";
import styles from "../styles/Accordion.module.css";
import Container from "../wrappers/Container";
import ArrowIc from "./ArrowIc";
import StarIc from "./StarIc";

interface Props {
    attractions: Array<any>;
}

const Accordion: FC<Props> = ({ attractions }) => {
    const [attractionTypes, setAttractionTypes] = useState<any[]>([]);
    const [checked, setChecked] = useState("הכל");
    const [favorites, setFavorites] = useLocalStorage<{ [x: string]: any }>(
        "favorites",
        {}
    );
    const { showAlert } = useAlert();

    const isFavorite = (id: string) => {
        return !!favorites[id];
    };

    useEffect(() => {
        const types = Array.from(
            new Set(attractions.map((a) => a.attractionType))
        );

        types.unshift("הכל");

        setAttractionTypes(types);
    }, [attractions]);

    const toggleFavorite = (id: string) => {
        const copy = { ...favorites };
        if (copy[id]) {
            delete copy[id];
            setFavorites(copy);
            showAlert("הוסר ממועדפים");
        } else {
            copy[id] = 1;
            setFavorites(copy);
            showAlert("נוסף למועדפים");
        }
    };

    return (
        <>
            <Container fluid className={styles.aTypes}>
                {attractionTypes.map((t) => (
                    <div key={"type:" + t}>
                        <input
                            name="attractionType"
                            type="radio"
                            id={t}
                            checked={checked === t}
                            onChange={() => setChecked(t)}
                        />
                        <label htmlFor={t}>{t}</label>
                    </div>
                ))}
            </Container>
            <ul className={styles.list}>
                {attractions
                    .filter(
                        (i) => checked === "הכל" || i.attractionType === checked
                    )
                    .map((a, i) => {
                        return (
                            <li
                                key={a.id + a.name}
                                style={{ animationDelay: `${100 * i}ms` }}
                            >
                                <AccordionEntry
                                    data={a}
                                    favorite={isFavorite(a.id) || false}
                                    toggleFavorite={toggleFavorite}
                                />
                            </li>
                        );
                    })}
            </ul>
        </>
    );
};

interface EntryProps {
    data: any;
    favorite: boolean;
    toggleFavorite: (id: string) => void;
}

const AccordionEntry: FC<EntryProps> = ({ data, favorite, toggleFavorite }) => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active);
    };

    const starClickHandler = (e: any) => {
        e.stopPropagation();
        toggleFavorite(data.id);
    };

    return (
        <div className={`${styles.entry} ${active ? styles.active : ""}`}>
            <div className={styles.header} onClick={clickHandler}>
                <div className={styles.openIc}>
                    <ArrowIc />
                </div>
                <div className={styles.name}>{data.name}</div>
                <div className={styles.distance}>
                    {data.distance.toFixed(1)} ק"מ
                </div>
                <div className={styles.favoritesIc} onClick={starClickHandler}>
                    <StarIc active={favorite} />
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
