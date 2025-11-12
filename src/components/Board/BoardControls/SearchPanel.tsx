import { FC } from "react";
import { SearchBar } from "./SearchBar";

interface SearchPanelProps {
  value: any;
  onSearch: (query: string) => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({ value, onSearch }) => {
  return <SearchBar onSearch={onSearch} value={value} />;
};
