import type { Anime, AnimeFilter, AnimeGenreResponse, AnimeListResponse, AnimeState } from "@/types/Anime";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { uniqBy } from "lodash";

const MAX_LIMIT = 16;
export const defaultAnimeFilter: AnimeFilter = {
  page: 1,
  limit: MAX_LIMIT,
  query: "",
  genres: "",
  type: undefined,
  status: undefined,
  rating: "r17",
  order_by: "popularity",
  sort: "asc"
};

export const getAnimeGenres = async () => {
  const response = await axios.get<AnimeGenreResponse>("https://api.jikan.moe/v4/genres/anime", {
    params: { filter: "genres" }
  });
  return response.data;
};

const animeApi = async (filter: AnimeFilter) => {
  const { page, limit, query, genres, type, status, rating, start_date, end_date, order_by, sort } = filter;
  const response = await axios.get<AnimeListResponse>("https://api.jikan.moe/v4/anime", {
    params: { page, limit, q: query, genres, type, status, rating, start_date, end_date, order_by, sort, sfw: true }
  });
  return response.data;
};

const initialState: AnimeState = {
  list: {
    filters: defaultAnimeFilter,
    data: [],
    pagination: {
      last_visible_page: 1,
      has_next_page: false,
      current_page: 1,
      items: { count: 0, total: 0, per_page: 8 }
    },
    loading: false,
    isLoadingMore: false,
    error: null
  },
  detail: {
    anime: null,
    loading: false,
    error: null
  }
};

// Load initial anime list
export const loadInitialAnimeList = createAsyncThunk("anime/loadInitialAnimeList", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { anime: AnimeState };
    const filter = { ...state.anime.list.filters, page: 1, limit: MAX_LIMIT };
    const data = await animeApi(filter);
    return { data: uniqBy(data.data, "mal_id"), pagination: data.pagination, filter };
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

// Load more anime for infinite scroll
export const loadMoreAnimeList = createAsyncThunk("anime/loadMoreAnimeList", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { anime: AnimeState };
    const { filters, pagination, data } = state.anime.list;
    if (!pagination.has_next_page) return null;

    const nextPage = pagination.current_page + 1;
    const filter = { ...filters, page: nextPage, limit: MAX_LIMIT };

    const resp = await animeApi(filter);
    return {
      data: uniqBy([...data, ...resp.data], "mal_id"),
      pagination: resp.pagination
    };
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

// Fetch single anime detail
export const fetchAnimeDetail = createAsyncThunk<Anime, string>("anime/fetchAnimeDetail", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return response.data.data as Anime;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message ?? error?.message);
  }
});

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<AnimeFilter>>) => {
      state.list.filters = { ...state.list.filters, ...action.payload };
    },
    clearAnimeDetail: (state) => {
      state.detail.anime = null;
      state.detail.error = null;
      state.detail.loading = false;
    }
  },
  extraReducers: (builder) => {
    // Initial Load
    builder
      .addCase(loadInitialAnimeList.pending, (state) => {
        state.list.loading = true;
        state.list.error = null;
      })
      .addCase(loadInitialAnimeList.fulfilled, (state, action) => {
        state.list.loading = false;
        if (!action.payload) return;
        const { data, pagination, filter } = action.payload;
        state.list.data = data;
        state.list.pagination = pagination;
        state.list.filters = filter;
      })
      .addCase(loadInitialAnimeList.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload as string;
      });

    // Load More
    builder
      .addCase(loadMoreAnimeList.pending, (state) => {
        state.list.isLoadingMore = true;
      })
      .addCase(loadMoreAnimeList.fulfilled, (state, action) => {
        state.list.isLoadingMore = false;
        if (!action.payload) return;
        const { data, pagination } = action.payload;
        state.list.data = data;
        state.list.pagination = pagination;
      })
      .addCase(loadMoreAnimeList.rejected, (state, action) => {
        state.list.isLoadingMore = false;
        state.list.error = action.payload as string;
      });

    // Detail
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.detail.loading = true;
        state.detail.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.detail.loading = false;
        state.detail.error = action.payload as string;
      });
  }
});

export const { setFilters, clearAnimeDetail } = animeSlice.actions;
export default animeSlice.reducer;
