import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { DEFAULT_SETTINGS } from "../../../constants/settingsConfig";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value: string;
}

export const SearchBar = React.memo(function SearchBar({
  onSearch,
  placeholder = "Search",
  value,
}: SearchBarProps) {
  const [query, setQuery] = useState(value || "");
  const debouncedQuery = useDebounce(query, DEFAULT_SETTINGS.searchDebounce);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      value={query}
      aria-label="Search input"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
});
