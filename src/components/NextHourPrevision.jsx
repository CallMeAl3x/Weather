import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";

const NextHourPrevision = () => {
  const { location } = useLocation();
  const [forecastData, setForecastData] = useState([]);
  const roundTemperature = (temp) => Math.round(temp);

  useEffect(() => {
    const { lat, lng } = location.coordinates;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${location.metrics}`;

    fetchWeatherData(url);
  }, [location.coordinates, location.metrics]);

  const fetchWeatherData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setForecastData(result.list);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données météo:",
          error
        );
      });
  };

  return (
    <article className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start lg:gap-6 mr-auto ml-auto mt-6 lg:mr-0 lg:mt-0 gridtemplate lg:w-[100vw]">
      {forecastData.slice(0, 8).map((forecast, index) => (
        <section key={index}>
          <div className="flex flex-col bg-gray rounded-2xl p-3 items-center card">
            <p className="mt-1 mb-6 after:top-[150%] after:border-black after:border-[0.25px] after:left-[-19px] after:w-[75px] after:absolute relative">
              {forecast.dt_txt.split(" ")[1].substring(0, 2)}:00
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt=""
              height={60}
              width={60}
            />
            <p className="text-light-gray">{forecast.weather[0].main}</p>
            <h1 className="mt-4 mb-3 text-4xl">
              {roundTemperature(forecast.main.temp)}°
            </h1>
          </div>
        </section>
      ))}
    </article>
  );
};

export default NextHourPrevision;
