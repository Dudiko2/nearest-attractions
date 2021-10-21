import { useCallback, useState } from "react";

interface Props {
    latitude?: number;
    longitude?: number;
}

const useAttractions = ({ latitude, longitude }: Props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);

    const init = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAttractions({ latitude, longitude });
            setData(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [latitude, longitude]);

    return {
        data,
        error,
        loading,
        init,
    };
};

const getAttractions = async ({ latitude, longitude }: Props) => {
    const raw = await fetch(
        `/api/attractions?lat=${latitude}&long=${longitude}`
    );
    const json = await raw.json();

    return json;
};

export default useAttractions;
