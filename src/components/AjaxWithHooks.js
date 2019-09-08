import React, { useState } from "react";

const AjaxWithHooks = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div>
      <h2> Ajax with Hooks - Search Engine</h2>
      <input type="text" value={query} onChange={handleInputChange} />
    </div>
  );
};

export default AjaxWithHooks;
