import React, { useState, useEffect } from "react";
import axios from "axios";

const AjaxWithHooks = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({ hits: [] });

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=" + query
      );

      if (!ignore) {
        setData(result.data);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <div>
      <h2> Ajax with Hooks - Search Engine</h2>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {data.hits.map(hit => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AjaxWithHooks;
