import { useState, useEffect } from "react";

/* Yes */

const useUserLocation = () => {
  const [Userlocation, setUserLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  useEffect(() => {
    const onSuccess = (location) => {
      setUserLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        error: null,
      });
      console.log(location.coords.latitude, location.coords.longitude);
    };

    const onError = (error) => {
      setUserLocation({
        loaded: true,
        coordinates: { lat: "", lng: "" },
        error: error.message,
      });
      console.log(error.message);
    };

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message:
          "La géolocalisation n'est pas prise en charge par votre navigateur",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 10000,
      });
    }
  }, []);

  return Userlocation;
};

export default useUserLocation;
