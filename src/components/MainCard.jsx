import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import windy from "../icons/windy.svg";

const MainCard = () => {
  const { location, fetchWeatherData, isCelsius } = useLocation();
  const [isLoading, setIsLoading] = useState(location.isLoading);
  const roundTemperature = (temp) => Math.round(temp);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Commencer le chargement
      await fetchWeatherData();
      setIsLoading(false); // Fin du chargement
    };

    fetchData();
  }, [location.coordinates, fetchWeatherData]);

  if (
    !location.weatherData ||
    !location.weatherData.daily ||
    location.weatherData.daily.length === 0
  ) {
    return null;
  }

  const todayWeather = location.weatherData.daily[0]; // Obtenez les données météo d'aujourd'hui

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Ajouter un zéro devant les heures et minutes si nécessaire pour maintenir le format HH:MM
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article className="w-auto">
      <div className="flex flex-col rounded-2xl bg-gray p-4 lg:w-max lg:min-w-[27vw]">
        <div className="flex justify-between mt-1.5">
          <h1 className="text-6xl min-w-fit">
            {roundTemperature(location.weatherData.locationTemp)}{" "}
            {isCelsius ? "°C" : "°F"}
          </h1>
          <div className="ml-4 flex flex-col items-end">
            <h3 className="text-3xl font-normal max-w-min text-right">
              {location.weatherData.locationName}
            </h3>
            <p>{getCurrentTime()}</p>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${location.weatherData.locationicon}@2x.png`}
              alt=""
              className="mr-3"
              height={70}
              width={70}
            />
            <p className="text-light-gray">
              {location.weatherData.locationweather}
            </p>
          </div>

          <div className="flex ml-4">
            <img src={windy} height={25} width={25} className="mr-3" alt="" />
            <p className="text-xl">{location.weatherData.locationwind} m/s</p>
          </div>
        </div>

        <div className="flex justify-between items-baseline mt-6 mb-2">
          <p>
            Feel like:{" "}
            {roundTemperature(location.weatherData.locationfeels_like)}
            {isCelsius ? "°C" : "°F"}
          </p>
          <p className="ml-4">
             {roundTemperature(todayWeather.temp.min)}°&#8291;
            to &#8291;
             {roundTemperature(todayWeather.temp.max)}°
          </p>
        </div>
      </div>
    </article>
  );
};

export default MainCard;
