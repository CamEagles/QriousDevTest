import "./App.css";
import FamilyTree from "./components/FamilyTree/FamilyTree";
import data from "./data/defaultData.json";

function App() {
  return (
    <div className="App">
      <FamilyTree title="Family tree" data={data} />
    </div>
  );
}

export default App;
