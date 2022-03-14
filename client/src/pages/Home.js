import { useState } from "react";
import "./App.css";
import SearchResults from "../components/SearchResults";

export default function HomePage() {
  const [queryString, setQueryString] = useState("");
  const [active, setActive] = useState(null);
  const [queryResults, setQueryResults] = useState([]);
  async function callSearchFunction(queryStr) {
    console.log("Saerch");
    setQueryString(queryStr);
    fetch(`search?query=${queryStr}`)
      .then((response) => response.json())
      .then((result) => setQueryResults(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="App">
      <header>Node search app</header>
      <div className="input-field-container">
        {/* Input field */}
        <input
          type="search"
          value={queryString}
          className="input-field"
          placeholder="Search users by ID, name or address"
          autoFocus
          onChange={(e) => callSearchFunction(e.target.value)}
        />
        {/* Search Result component handles showing the results */}
        <SearchResults
          queryString={queryString}
          queryResults={queryResults}
          active={active}
          setActive={setActive}
        />
      </div>
    </div>
  );
}
