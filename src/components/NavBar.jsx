import { useState, useEffect } from "react";
import { useLocation } from "./LocationContext";
import Search from "../icons/Search.svg";

/* Yes */

const NavBar = () => {
  const { setLocation, metrics, setMetrics } = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [isCelsius, setIsCelsius] = useState(metrics === "metric");

  useEffect(() => {
    // This effect will run when `metrics` changes
    setIsCelsius(metrics === "metric");
  }, [metrics]);

  const toggleTemperature = () => {
    const newMetrics = isCelsius ? "metric" : "fahrenheit";
    setIsCelsius(!isCelsius);
    setMetrics(newMetrics);
    console.log("Metrics changed to", newMetrics);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (!inputValue) {
      console.log("Pas de valeur entrée pour la recherche.");
      return;
    }

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=c28815edb004a1bbb16a3c7e0ac10fce&units=${metrics}`;

    fetch(geoUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log("Résultat de la géolocalisation :", result);
        if (result && result.length > 0) {
          const { lat, lon } = result[0];
          setLocation({ lat, lng: lon });
          if (lat && lon) {
            setLocation((prevLocation) => ({
              ...prevLocation,
              coordinates: { lat, lng: lon },
              isLoading: true,
            }));
          } else {
            console.error(
              "Latitude ou longitude manquantes dans la réponse de lAPI."
            );
          }
        } else {
          console.error("Aucun résultat trouvé pour la ville recherchée.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche de la ville :", error);
      });
  };

  return (
    <nav className="flex justify-between items-center">
      <div className="relative mr-6 my-2 mt-4 w-fit bg-gray rounded-[30px]">
        <input
          type="search"
          value={inputValue}
          className="bg-transparent rounded-[30px] ml-8 p-3 placeholder:pl-0 placeholder:w-fit lg:placeholder:pr-24 lg:pr-24 lg:w-[112%] active:outline-none focus:outline-none max-[360px]:w-[80%]"
          placeholder="Search city..."
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div className="absolute -top-0.5 left-2 mt-3 mr-4">
          <img src={Search} alt="" height={30} width={30} />
        </div>
      </div>
      <div className="rounded-full bg-gray flex justify-center h-fit p-0 sm:p-1">
        <div
          className={`rounded-full w-9 h-9 flex justify-center items-center font-bold cursor-pointer transition duration-200 ease-in-out ${
            !isCelsius
              ? "bg-almost-white text-almost-black"
              : "bg-transparent text-almost-white"
          }`}
          onClick={toggleTemperature}>
          °C
        </div>
        <div
          className={`rounded-full w-9 h-9 flex justify-center items-center font-bold cursor-pointer transition duration-20 ease-in-out ${
            isCelsius
              ? "bg-almost-white text-almost-black"
              : "bg-transparent text-almost-white"
          }`}
          onClick={toggleTemperature}>
          °F
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
