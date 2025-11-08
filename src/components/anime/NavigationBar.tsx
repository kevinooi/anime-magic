import { useEffect, useState } from "react";
import useScrollTop from "@/hooks/useScrollTop";
import className from "@/utils";
import { TbFilter } from "react-icons/tb";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import Dialog from "../ui/Dialog";
import Select from "../ui/Select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { AnimeFilter } from "@/types/Anime";
import { defaultAnimeFilter, getAnimeGenres, loadInitialAnimeList, setFilters } from "@/store/animeSlice";

const typeOptions = [
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
  { value: "cm", label: "CM" },
  { value: "pv", label: "PV" },
  { value: "tv_special", label: "TV Special" }
];

const statusOptions = [
  { value: "airing", label: "Airing" },
  { value: "complete", label: "Complete" },
  { value: "upcoming", label: "Upcoming" }
];

const ratingOptions = [
  { value: "g", label: "All Ages" },
  { value: "pg", label: "Children" },
  { value: "pg13", label: "Teens 13 or older" },
  { value: "r17", label: "17+ (violence & profanity)" },
  { value: "r", label: "Mild Nudity" }
];

const orderByOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "score", label: "Score" },
  { value: "members", label: "Members" },
  { value: "episodes", label: "Episodes" },
  { value: "start_date", label: "Newest" }
];

const sortOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Desc" }
];

const NavigationBar = () => {
  const { isSticky } = useScrollTop();
  const [isOpen, setIsOpen] = useState(false);
  const [genreOptions, setGenreOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    getAnimeGenres()
      .then((res) => {
        const options = res.data.map((anime) => ({
          value: anime.mal_id,
          label: anime.name
        }));
        setGenreOptions(options);
      })
      .catch((e) => console.error(e));
  }, []);

  const openDialog = () => {
    setIsOpen(true);
  };
  const onDialogClose = () => {
    setIsOpen(false);
  };

  const filters = useAppSelector((s) => s.anime.list.filters);
  const [tempFilters, setTempFilters] = useState<AnimeFilter>(filters);

  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  const dispatch = useAppDispatch();
  const updateTemp = (data: Partial<AnimeFilter>) => {
    setTempFilters((prev) => ({ ...prev, ...data }));
  };
  const reset = () => {
    setTempFilters({ ...defaultAnimeFilter, query: filters.query });
  };
  const handleSubmit = () => {
    dispatch(setFilters(tempFilters));
    dispatch(loadInitialAnimeList());
    onDialogClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      className={className("w-full fixed inset-x-0 z-50", isSticky ? "top-2" : "top-4")}
    >
      <div
        className={className(
          "flex flex-row self-start items-center justify-between py-3 max-w-6xl mx-auto px-4 rounded-xl relative z-55 w-full transition duration-200",
          isSticky ? "bg-gray-800 shadow-lg" : "bg-transparent"
        )}
      >
        <a href="/" className="flex items-center gap-1 z-60">
          <img src="/logo.svg" alt="logo" className="object-contain h-8 w-10" />
          <p className="hidden md:block text-sm font-bold text-white">Anime Magic</p>
        </a>
        <div className="flex flex-row flex-1 absolute inset-0 items-center justify-center text-sm font-medium transition duration-200 perspective-[1000px] overflow-auto sm:overflow-visible no-visible-scrollbar">
          <SearchBar />
        </div>
        <button className="flex items-center gap-1 z-60" onClick={openDialog}>
          <TbFilter size={20} />
          <span className="hidden md:block text-sm font-bold">Filter</span>
        </button>
      </div>

      <Dialog isOpen={isOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
        <h4 className="mb-4 font-bold text-lg">Filter</h4>
        <h4 className="font-medium mb-2">Genres</h4>
        <Select
          options={genreOptions}
          value={genreOptions.filter((option) => option.value === Number(tempFilters.genres))}
          onChange={(option: any) => updateTemp({ genres: option?.value ?? undefined })}
          isClearable
        />
        <h4 className="font-medium my-2">Type</h4>
        <Select
          options={typeOptions}
          value={typeOptions.filter((option) => option.value === tempFilters.type)}
          onChange={(option: any) => updateTemp({ type: option?.value ?? undefined })}
          isClearable
        />
        <h4 className="font-medium my-2">Status</h4>
        <Select
          options={statusOptions}
          value={statusOptions.filter((option) => option.value === tempFilters.status)}
          onChange={(option: any) => updateTemp({ status: option?.value ?? undefined })}
          isClearable
        />
        <h4 className="font-medium my-2">Rating</h4>
        <Select
          options={ratingOptions}
          value={ratingOptions.filter((option) => option.value === tempFilters.rating) ?? undefined}
          onChange={(option: any) => updateTemp({ rating: option?.value ?? undefined })}
          isClearable
        />
        <h4 className="font-medium my-2">Sort</h4>
        <div className="flex justify-start items-center gap-4">
          <Select
            options={orderByOptions}
            value={orderByOptions.filter((option) => option.value === tempFilters.order_by)}
            onChange={(option: any) => updateTemp({ order_by: option?.value ?? undefined })}
            isClearable
          />
          <Select
            options={sortOptions}
            value={sortOptions.filter((option) => option.value === tempFilters.sort)}
            onChange={(option: any) => updateTemp({ sort: option?.value ?? undefined })}
            isClearable
          />
        </div>
        <div className="flex justify-end items-center gap-2 mt-4">
          <button className="border rounded-lg" onClick={() => reset()}>
            Reset
          </button>
          <button className="bg-gray-700 text-white rounded-lg border " onClick={() => handleSubmit()}>
            Apply
          </button>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default NavigationBar;
