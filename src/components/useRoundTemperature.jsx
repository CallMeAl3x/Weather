// useRoundTemperature.js
import { useMemo } from "react";

const useRoundTemperature = (temperatures) => {
  const roundedTemps = useMemo(
    () => temperatures.map((temp) => Math.round(temp)),
    [temperatures]
  );
  return roundedTemps;
};

export default useRoundTemperature;
