import { createContext, FC, useContext, useState } from "react";
import Alert from "../components/Alert";

interface IContextValue {
    showAlert: (msg: string) => void;
}

const AlertContext = createContext({} as IContextValue);

export const AlertProvider: FC = ({ children }) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [timeId, setTimeId] = useState(0);

    const showAlert = (msg: string) => {
        if (timeId) clearTimeout(timeId);

        setMessage(msg);
        setShow(true);
        const id = window.setTimeout(() => {
            setShow(false);
        }, 1000);
        setTimeId(id);
    };
    const val = { showAlert };

    return (
        <AlertContext.Provider value={val}>
            {children}
            <Alert show={show}>{message}</Alert>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
