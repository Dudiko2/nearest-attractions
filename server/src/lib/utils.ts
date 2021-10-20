type TC = <T>(fn: () => Promise<T>) => Promise<[T, null] | [null, unknown]>;

export const tryCatch: TC = async (fn) => {
    try {
        const data = await fn();
        return [data, null];
    } catch (error) {
        return [null, error];
    }
};

interface LatLong {
    latitude: number;
    longitude: number;
}

const haversine = (angle: number) => Math.pow(Math.sin(angle), 2);

const degreesToRadians = (deg: number) => (deg * Math.PI) / 180;

// calculates distance between points on a sphere using the haversine formula
export const distanceBetweenCoordinates =
    (a: LatLong) =>
    (b: LatLong): number => {
        const dLat = degreesToRadians(b.latitude - a.latitude);
        const dLong = degreesToRadians(b.longitude - a.longitude);
        const latA = degreesToRadians(a.latitude);
        const latB = degreesToRadians(b.latitude);
        const earthRadius = 6371;

        const temp =
            haversine(dLat) +
            Math.cos(latA) * Math.cos(latB) * haversine(dLong);

        const result = 2 * Math.asin(Math.sqrt(temp));

        return earthRadius * result;
    };
