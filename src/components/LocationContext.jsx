import { createContext, useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState({ lat: "48.8566", lng: "2.3522" });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState("metric");
  const [isCelsius, setIsCelsius] = useState(metrics === "metric"); // Ajout de l'état isCelsius

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true);
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly,minutely,current,alerts&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${metrics}`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${metrics}`;

    try {
      const oneCallResponse = await fetch(oneCallUrl);
      const oneCallData = await oneCallResponse.json();

      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      setWeatherData({ ...oneCallData, locationName: weatherData.name, locationTemp: weatherData.main.temp, locationfeels_like: weatherData.main.feels_like, locationwind: weatherData.wind.speed, locationicon: weatherData.weather[0].icon, locationweather: weatherData.weather[0].main });
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [coordinates, metrics]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  useEffect(() => {
    setIsCelsius(metrics === "metric");
  }, [metrics]);

  const updateCoordinates = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  useEffect(() => {
    const getCurrentPosition = (position) => {
      updateCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
      console.log("Position de l'utilisateur obtenue:", position.coords.latitude, position.coords.longitude);
    };

    const handleLocationError = () => {
      updateCoordinates({ lat: "48.8566", lng: "2.3522" }); // Utilise les coordonnées de Paris par défaut
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getCurrentPosition, handleLocationError);
    } else {
      handleLocationError();
    }
  }, []);

  const value = {
    location: { coordinates, isLoading, weatherData, metrics },
    setLocation: setCoordinates,
    fetchWeatherData,
    setMetrics,
    isCelsius,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
