import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Define the type for search results
interface SearchResult {
  id: number; // Adjust based on your data
  name: string; // Adjust based on your data
  // Add any other properties as needed
}

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const [results, setResults] = useState<SearchResult[]>([]); // Use the SearchResult type
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    if (query) {
      setLoading(true); // Start loading
      setError(null); // Reset error

      fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: SearchResult[]) => {
          console.log("Search results:", data); // Debugging
          setResults(data);
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
          setError("Failed to fetch search results. Please try again.");
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {results.length > 0 ? (
            results.map(result => (
              <li key={result.id}>{result.name}</li>
            ))
          ) : (
            <p>No results found for "{query}"</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
