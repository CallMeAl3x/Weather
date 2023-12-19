import { useEffect, useState } from "react";
import { useLocation } from "./LocationContext";

/* Yes */

const OtherCities = () => {
  const { location } = useLocation();
  const [isLoading, setIsLoading] = useState(true); // Ajout d'un indicateur de chargement
  const [OtherCitiesData, setOtherCitiesData] = useState({});
  const roundTemperature = (temp) => Math.round(temp);
  const OtherCitiesName = [
    {
      name: "New York",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      name: "Copenhagen",
      coordinates: { lat: 55.6761, lng: 12.5683 },
    },
    {
      name: "HoChiMinhCity",
      coordinates: { lat: 10.7769, lng: 106.7009 },
    },
  ];

  useEffect(() => {
    const promises = OtherCitiesName.map((city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${location.metrics}`;
      return fetchWeatherData(city.name, url);
    });

    // Attendez que toutes les requêtes soient terminées avant de définir le chargement sur false
    Promise.all(promises).finally(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.metrics]); // Exécuté une seule fois au montage du composant

  const fetchWeatherData = async (cityName, url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setOtherCitiesData((prevData) => ({
        ...prevData,
        [cityName]: data,
      }));
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données météo pour ${cityName}:`,
        error
      );
    }
  };

  if (isLoading) {
    return console.log("Loading...");
  }

  return (
    <article className="flex-col mt-8 lg:mt-0 lg:w-fit lg:min-w-[27vw] pb-12">
      <div>
        <h3>Other large cities</h3>
      </div>
      {Object.entries(OtherCitiesData).map(([cityName, data]) => (
        <div
          key={cityName}
          className="flex flex-row justify-between bg-gray rounded-2xl p-5 pb-4 mt-6">
          <div className="flex flex-col">
            <p className="text-light-gray text-base font-normal">
              {data.sys.country}
            </p>
            <h2 className=" font-[400] text-3xl">{cityName}</h2>
            <p className="mt-2">{data.weather[0].description}</p>
          </div>

          <div className="flex flex-col items-center justify-between">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
              height={65}
              width={65}
            />
            <h2 className=" font-normal text-4xl">
              {roundTemperature(data.main.temp)}°
            </h2>
          </div>
        </div>
      ))}
    </article>
  );
};

export default OtherCities;
