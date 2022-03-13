export default function SearchResults({ queryString, queryResults }) {
  if (!queryString) {
    return <StartSearch />;
  } else if (queryResults.length === 0) {
    return <NoResults />;
  } else {
    return <ShowResults />;
  }

  function StartSearch() {
    return <div>Start search</div>;
  }

  function NoResults() {
    return <div>No results match your query</div>;
  }
  function ShowResults() {
    return (
      <div>
        {queryResults.map((data, i) => (
          <a key={i} href={`/user?id=${data.id}`}>
            <div>
              {data.id}
              {data.name}
              {data.address}
              {data.items.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
          </a>
        ))}
      </div>
    );
  }
}
