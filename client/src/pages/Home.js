import { useState } from "react";
import "./App.css";
import SearchResults from "../components/SearchResults";
export default function HomePage() {
  const [queryString, setQueryString] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  async function callSearchFunction(queryStr) {
    setQueryString(queryStr);
    fetch(`search?query=${queryStr}`)
      .then((response) => response.json())
      .then((result) => setQueryResults(result))
      .catch((error) => console.log("error", error));
  }
  console.log(queryResults);
  return (
    <div className="App">
      <header>Node search app</header>
      <div className="Input-header">
        <input
          type="search"
          value={queryString}
          onChange={(e) => callSearchFunction(e.target.value)}
        />
        <SearchResults queryString={queryString} queryResults={queryResults} />
      </div>
    </div>
  );
}
