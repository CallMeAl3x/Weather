import BottomPart from "./BottomPart";
import TopPart from "./TopPart";
import { LocationProvider } from "./components/LocationContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <LocationProvider>
      <main className="py-6 px-2 sm:px-4 lg:ml-8 lg:mr-8">
        <NavBar />
        <TopPart />
        <BottomPart />
      </main>
    </LocationProvider>
  );
}

export default App;
