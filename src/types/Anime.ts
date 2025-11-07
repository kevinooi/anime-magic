export type AnimeFilter = {
  page?: number;
  limit?: number;
  query?: string;

  genres?: string; // comma-separated IDs
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
  status?: "airing" | "complete" | "upcoming";
  rating?: "g" | "pg" | "pg13" | "r17" | "r";

  start_date?: string;
  end_date?: string;

  order_by?: "score" | "popularity" | "members" | "episodes" | "start_date";
  sort?: "asc" | "desc";
};

export type AnimeState = {
  list: {
    filters: AnimeFilter;
    data: Anime[];
    pagination: AnimePagination;
    loading: boolean;
    isLoadingMore: boolean;
    error: string | null;
  };
  detail: {
    anime: Anime | null;
    loading: boolean;
    error: string | null;
  };
};

export type AnimeListResponse = {
  data: Anime[];
  pagination: AnimePagination;
};

export type AnimePagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type AnimeGenreResponse = {
  data: AnimeGenre[];
};

export type AnimeGenre = {
  mal_id: number;
  name: string;
  url: string;
  count: number;
};

export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: { image_url: string };
    webp: { image_url: string };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  rating: string;
  score: number;
  rank: number;
  popularity: number;
  members: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
  };
  studios: { mal_id: number; name: string; url: string }[];
  producers: { mal_id: number; name: string; url: string }[];
  licensors: { mal_id: number; name: string; url: string }[];
  genres: { mal_id: number; name: string; url: string }[];
  themes: { mal_id: number; name: string; url: string }[];
  demographics: { mal_id: number; name: string; url: string }[];
};
