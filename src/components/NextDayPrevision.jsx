import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";

const NextDayPrevision = () => {
  const { location } = useLocation();
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const roundTemperature = (temp) => Math.round(temp);

  useEffect(() => {
    const { lat, lng } = location.coordinates;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${location.metrics}`;

    fetchWeatherData(url);
  }, [location.coordinates, location.metrics]);

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setDailyForecasts(result.daily.slice(0, 5));
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      console.log(error);
    }
  };

  const getWeekDay = (timestamp, index) => {
    if (index === 0) return "Today";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <article className="flex-col">
      <div>
        <h3>5-day forecast</h3>
        <div className="flex flex-col lg:w-[62vw]">
          {dailyForecasts.map((dayData, index) => {
            const temperatureActuelle = dayData.temp.day || dayData.temp.main; // Modifier selon la structure de vos données
            const percentageOfVariation =
              ((temperatureActuelle - dayData.temp.min) /
                (dayData.temp.max - dayData.temp.min)) *
              100;
            return (
              <div
                key={dayData.date}
                className="flex p-0.5 bg-gray rounded-2xl justify-between mt-4 items-center max-[360px]:w-[95vw]">
                <h1 className="ml-3 min-w-[110px] font-[300]">
                  {getWeekDay(dayData.dt, index)}
                </h1>
                <div className="flex items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
                    alt=""
                    className="mr-3 h-[40px] w-[40px] max-w-[400px] sm:h-[70px] sm:w-[70px]"
                  />
                  <p className="text-light-gray font-medium hidden sm:block">
                    {dayData.weather[0].main}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="mr-4 text-xl max-[360px]:mr-1 ">
                    {roundTemperature(dayData.temp.min)}°
                  </p>
                  <div className="min-[360px]:hidden">to</div>
                  <div className="progression relative w-[27vw] h-2 rounded-full bg-almost-black max-[380px]:hidden ">
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full bg-blue"
                      style={{ width: `${percentageOfVariation}%` }}></div>
                  </div>
                  <p className="ml-2 mr-2 text-xl max-[360px]:mr-1">
                    {roundTemperature(dayData.temp.max)}°
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default NextDayPrevision;
