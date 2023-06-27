import React from "react";

const SearchInput = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks by title, username or assignee name"
      value={searchQuery}
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default SearchInput;
