export default function SearchResults({ queryString, queryResults }) {
  console.log(queryResults.length);
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
          <div key={i}>{data.name}</div>
        ))}
      </div>
    );
  }
}
