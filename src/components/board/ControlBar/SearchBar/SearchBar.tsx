import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import "./SearchBar.css";
import { useSettings } from "../../../../context/SettingsContext";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = React.memo(function SearchBar({
  onSearch,
  placeholder = "Search",
}: SearchBarProps) {
  const { settings } = useSettings();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, settings.searchDebounce);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
});
