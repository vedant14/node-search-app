import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useKeyPress from "../utils/arrowKeyPress";
export default function SearchResults({
  queryString,
  queryResults,
  active,
  setActive,
}) {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const navigate = useNavigate();

  function onHover(value) {
    setActive(value);
  }

  useEffect(() => {
    // When the enter key is pressed navigate to the active element, if the active element exists
    if (enterPressed) {
      if (active || active === 0) {
        navigate(`/user?id=${queryResults[active].id}`);
      }
    }
  }, [enterPressed]);

  useEffect(() => {
    // When the arrow up is pressed move to the element above the current active element, if the active is greater than zero
    if (arrowUpPressed) {
      if (active <= 0) {
        setActive(null);
      } else {
        setActive(active - 1);
      }
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    // When the arrow down is pressed move to the element below the current active element, if the active is smaller than the length of results array
    if (arrowDownPressed) {
      if (active === null) {
        setActive(0);
      } else if (active < queryResults.length - 1) {
        setActive(active + 1);
      }
    }
  }, [arrowDownPressed]);

  if (!queryString) {
    // If no input hide everything
    return null;
  } else if (queryResults.length === 0) {
    // If no results show No Results message
    return <NoResults />;
  } else {
    // Else show results.
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
          // If activestate matches the current element then attach the active class to the element
          <div
            className={`search-card ${active === i ? `active` : ``} `}
            key={i}
            onMouseEnter={() => onHover(i)}
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
