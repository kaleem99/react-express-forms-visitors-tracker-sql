import logo from "./logo.svg";
import "./App.css";
import { TableComponent } from "./TableComponent";
import { useEffect, useState } from "react";
import fetchData from "./Helpers/FetchData";

function App() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetchData(setState, "get-all-Visitors");
  }, []);
  return (
    <div className="App">
      <TableComponent data={state} />
    </div>
  );
}

export default App;
