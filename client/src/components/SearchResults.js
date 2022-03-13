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
    if (enterPressed) {
      console.log("HEre");
      if (active || active === 0) {
        console.log("HEre");
        navigate(`/user?id=${queryResults[active].id}`);
      }
    }
  }, [enterPressed]);

  useEffect(() => {
    if (arrowUpPressed) {
      if (active <= 0) {
        setActive(null);
      } else {
        setActive(active - 1);
      }
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      if (active === null) {
        setActive(0);
      } else if (active < queryResults.length - 1) {
        setActive(active + 1);
      }
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
