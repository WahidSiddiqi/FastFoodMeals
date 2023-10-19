import { useCallback, useState } from "react";
import search from "../api/search";
import { Link } from "react-router-dom";
import lodash from "lodash";
const linkStyle = {
  color: "black",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "0 10px",
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const debouncedSearch = lodash.debounce(
  async (queryString, setResults, setLoading) => {
    console.log("calling debounced search with " + queryString);
    if (queryString) {
      setLoading(true);
      const searchResponse = await search.search(queryString);
      setResults(searchResponse.data.results.branded);
      setLoading(false);
    }
  },
  1000
);

const Home = (props) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryString, setQueryString] = useState("");

  const onChangeInput = useCallback(
    async (e) => {
      setQueryString(e.target.value);
      debouncedSearch(e.target.value, setResults, setLoading);
    },
    [setQueryString]
  );
  // const { msgAlert, user } = props
  const { user } = props;
  if (!user) {
    return (
      <>
        <h2>Home Page</h2>
      </>
    );
  }
  console.log({ results });
  return (
    <div className="search-page">
      <div>
        <h2>Search Items</h2>
      </div>
      <div>
        <input type="text" value={queryString} onChange={onChangeInput} />
      </div>

      <div className="full-width margin-10 search-results">
        {loading && <div>Loading...</div>}
        {!loading && results === null && <div>Please try a search</div>}
        {!loading && results?.length === 0 && (
          <div>No results...Please try a search</div>
        )}
        {!loading && results?.length > 0 && (
          <div className="search-results-container">
            <div className="search-result-headline">
              <div>Brand</div>
              <div>Name</div>
              <div>Calories</div>
              <div>Thumbnail</div>
              <div>Actions</div>
            </div>
            {results.map((r) => {
              console.log({ r });
              return (
                <div className="search-result-row">
                  <div className="column-fixed">{r.brand_name}</div>
                  <div className="column-fixed">{r.food_name}</div>
                  <div className="column-fixed">{r.nf_calories}</div>
                  <div className="column-fixed">
                    <img
                      alt="thumbnail"
                      className="search-result-thumbnail"
                      src={r.photo?.thumb}
                    />
                  </div>
                  <div className="column-fixed">
                    <button>
                      <Link
                        to={`/add-item-to-meal?item_id=${r.nix_item_id}`}
                        style={linkStyle}
                      >
                        Add item to meal
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
