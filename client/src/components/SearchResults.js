import { useState, useEffect } from "react";
import useKeyPress from "../utils/arrowKeyPress";
export default function SearchResults({
  queryString,
  queryResults,
  active,
  setActive,
}) {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");

  useEffect(() => {
    if (arrowUpPressed) {
      if (active === 0) {
        setActive(1);
      } else {
        setActive(active - 1);
      }
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      setActive(active + 1);
    }
  }, [arrowDownPressed]);
  if (!queryString) {
    return null;
  } else if (queryResults.length === 0) {
    return <NoResults />;
  } else {
    return <ShowResults />;
  }

  function NoResults() {
    return (
      <div>
        <p>No results match your query</p>
      </div>
    );
  }
  function ShowResults() {
    return (
      <div className="search-results">
        {queryResults.map((data, i) => (
          <div
            className={`search-card ${active === i ? `active` : ``} `}
            key={i}
          >
            <a href={`/user?id=${data.id}`}>
              <p className="search-id">{data.id}</p>
              <p className="search-name">{data.name}</p>
              <p className="search-address">{data.address}</p>
            </a>
          </div>
        ))}
      </div>
    );
  }
}
