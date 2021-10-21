import { createContext, FC, useContext, useState } from "react";

export interface ILocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
}

interface IContextValue {
    data: ILocationData | null;
    error: any;
    loading: boolean;
    init: () => void;
}

const LocationContext = createContext({} as IContextValue);

export const useUserLocation = () => {
    return useContext(LocationContext);
};

export const UserLocationProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ILocationData | null>(null);
    const [error, setError] = useState<any>(null);

    const init = () => {
        setLoading(true);

        window.navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLoading(false);
                setData({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
            },
            (err) => {
                setLoading(false);
                setError(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    };

    const val = {
        data,
        error,
        loading,
        init,
    };

    return (
        <LocationContext.Provider value={val}>
            {children}
        </LocationContext.Provider>
    );
};
