import { IoSearch } from "react-icons/io5";
import "./App.css";
import { TableContainer } from "./Components/Table/TableContainer";

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-extrabold">{name}</h1>;
};

const FilterFirstLevel: React.FC<{ name: string }> = ({ name }) => {
  return (
    <button className="flex items-center justify-center border-2 border-black px-4 py-1">
      <span>{name}</span>
    </button>
  );
};

const FilterSecondLevel = () => {
  return (
    <div className="border-2 border-black px-2 py-1">
      <select defaultValue="Select your option" className="outline-none">
        <option disabled>Select your option</option>
      </select>
    </div>
  );
};

const FilterSearch = () => {
  return (
    <div className="flex items-center gap-2 border-2 border-black px-2 py-1">
      <IoSearch />
      <input type="text" placeholder="Search..." className="outline-none" />
    </div>
  );
};

function App() {
  return (
    <main className="">
      <div className="flex flex-col gap-6 p-8">
        <div>
          <Title name="Factures INTENDANCE" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <FilterFirstLevel name="Toutes les factures" />
            </div>
            <div>
              <FilterFirstLevel name="Factures validées" />
            </div>
            <div>
              <FilterFirstLevel name="Factures non validées" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <FilterSearch />
            </div>
            <div>
              <FilterSecondLevel />
            </div>
          </div>
        </div>
        <div className="w-full">
          <TableContainer />
        </div>
      </div>
    </main>
  );
}

export default App;
