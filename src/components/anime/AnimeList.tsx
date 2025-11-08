import Skeleton from "../ui/Skeleton";
import FileNotFound from "../../assets/FileNotFound";
import AnimeCard from "./AnimeCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loadInitialAnimeList, loadMoreAnimeList, setFilters } from "@/store/animeSlice";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Spinner from "../ui/Spinner";

const AnimeList = () => {
  const dispatch = useAppDispatch();
  const {
    data,
    loading,
    isLoadingMore,
    pagination,
    filters: { query }
  } = useAppSelector((state) => state.anime.list);

  const { containerRef } = useInfiniteScroll({
    offset: "100px",
    async onLoadMore() {
      if (pagination.has_next_page && !loading) {
        await dispatch(loadMoreAnimeList());
      }
    }
  });

  useEffect(() => {
    if ((query?.length ?? 0) == 0) {
      dispatch(setFilters({ query }));
      dispatch(loadInitialAnimeList());
    }
  }, [query]);

  useEffect(() => {
    if (loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div ref={containerRef}>
      {loading || data.length ? (
        <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {loading
            ? [...Array(4).keys()].map((item) => (
                <Skeleton key={`loading-${item}`} className="m-4 rounded-xl bg-gray-300 dark:bg-gray-500" height={400} />
              ))
            : data.map((anime, index) => <AnimeCard key={anime.mal_id} anime={anime} index={index} />)}
        </section>
      ) : (
        <div className="text-center pt-8 pb-4">
          <div className="flex justify-center">
            <FileNotFound />
          </div>
          <h3 className="text-gray-800 dark:text-white">No anime found!</h3>
        </div>
      )}

      {isLoadingMore && (
        <div className="pt-8 flex justify-center items-center">
          <Spinner size={50} />
        </div>
      )}
    </div>
  );
};

export default AnimeList;
