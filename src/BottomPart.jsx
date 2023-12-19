import NextDayPrevision from "./components/NextDayPrevision";
import OtherCities from "./components/OtherCities";

/* Yes */

const BottomPart = () => {
  return (
    <main className="flex justify-between flex-col-reverse lg:flex-row mt-12 lg:justify-start lg:items-baseline lg:gap-16">
      <OtherCities />
      <NextDayPrevision />
    </main>
  );
};

export default BottomPart;
