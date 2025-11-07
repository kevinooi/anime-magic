import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadInitialAnimeList, setFilters } from "@/store/animeSlice";
import DebounceSearch from "../ui/DebounceSearch";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const query = useAppSelector((s) => s.anime.list.filters.query);
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(query ?? "");
  }, [query]);

  const handleInputChange = (val: string) => {
    const clean = val.trim();
    setValue(clean);
    dispatch(setFilters({ query: clean }));
    dispatch(loadInitialAnimeList());
  };

  const handleClear = () => {
    setValue("");
    dispatch(setFilters({ query: "" }));
  };

  return (
    <div className="px-4 flex justify-center">
      <DebounceSearch
        type="text"
        className="w-full sm:w-sm md:w-md lg:w-lg xl:w-xl py-2 pl-8.5 pr-4 rounded-lg border-none"
        placeholder="Search anime..."
        value={value}
        onChange={handleInputChange}
        onClear={handleClear}
      />
    </div>
  );
};

export default SearchBar;
