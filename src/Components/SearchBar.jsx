import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex gap-3 items-center">
      <h4>Search Task</h4>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-slate-300 px-5 py-0.5 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
