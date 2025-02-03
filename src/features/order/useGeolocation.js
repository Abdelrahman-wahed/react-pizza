import { useState } from "react";

function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const { lat, lng } = position;

    function getPosition(callback) {
        if (!navigator.geolocation) {
            setError("Your browser does not support geolocation");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
                if (callback) callback(pos.coords.latitude, pos.coords.longitude); // Call callback with lat and lng
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { isLoading, error, lat, lng, getPosition };
}

export default useGeolocation;