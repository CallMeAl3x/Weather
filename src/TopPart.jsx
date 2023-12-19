import MainCard from "./components/MainCard";
import NextHourPrevision from "./components/NextHourPrevision";

const TopPart = () => {
  return (
    <section className="flex flex-col lg:flex-row mt-12 lg:items-start lg:gap-16">
      <MainCard />
      <NextHourPrevision />
    </section>
  );
};

export default TopPart;
