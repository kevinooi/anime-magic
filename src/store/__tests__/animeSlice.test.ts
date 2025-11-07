import reducer, {
  setFilters,
  clearAnimeDetail,
  loadInitialAnimeList,
  loadMoreAnimeList,
  fetchAnimeDetail,
  defaultAnimeFilter
} from "@/store/animeSlice";
import type { Anime, AnimeListResponse, AnimeState } from "@/types/Anime";
import { vi } from "vitest";

const axiosMock = (globalThis as any).axiosMock;

describe("animeSlice", () => {
  let initialState: AnimeState;

  beforeEach(() => {
    initialState = {
      list: {
        filters: defaultAnimeFilter,
        data: [],
        pagination: {
          last_visible_page: 1,
          has_next_page: true,
          current_page: 1,
          items: { count: 0, total: 0, per_page: 16 }
        },
        loading: false,
        isLoadingMore: false,
        error: null
      },
      detail: { anime: null, loading: false, error: null }
    };

    vi.clearAllMocks();
  });

  // Reducer Tests
  it("should handle setFilters", () => {
    const state = reducer(initialState, setFilters({ query: "naruto" }));
    expect(state.list.filters.query).toBe("naruto");
  });

  it("should handle clearAnimeDetail", () => {
    const state = reducer(
      {
        ...initialState,
        detail: { anime: { title: "One Piece" } as any, loading: true, error: "err" }
      },
      clearAnimeDetail()
    );
    expect(state.detail.anime).toBeNull();
    expect(state.detail.error).toBeNull();
    expect(state.detail.loading).toBe(false);
  });

  // loadInitialAnimeList
  it("should call axios with correct params for initial load", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        data: [{ mal_id: 1, title: "Naruto" }],
        pagination: { current_page: 1, has_next_page: false }
      }
    });

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ anime: initialState }));

    await loadInitialAnimeList()(dispatch, getState, undefined);

    expect(axiosMock.get).toHaveBeenCalledWith(
      "https://api.jikan.moe/v4/anime",
      expect.objectContaining({
        params: expect.objectContaining({
          page: 1,
          limit: 16,
          order_by: "popularity",
          sort: "asc",
          sfw: true
        })
      })
    );
  });

  it("should handle loadInitialAnimeList fulfilled", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        data: [{ mal_id: 1, title: "Naruto" }],
        pagination: { current_page: 1, has_next_page: false }
      }
    });

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ anime: initialState }));

    const result = await loadInitialAnimeList()(dispatch, getState, undefined);

    expect(result.type).toBe("anime/loadInitialAnimeList/fulfilled");
    expect((result.payload as AnimeListResponse | undefined)?.data[0].title).toBe("Naruto");
  });

  it("should handle loadInitialAnimeList rejected", async () => {
    axiosMock.get.mockRejectedValueOnce(new Error("Network error"));

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ anime: initialState }));

    const result = await loadInitialAnimeList()(dispatch, getState, undefined);

    expect(result.type).toBe("anime/loadInitialAnimeList/rejected");
    expect(result.payload).toBe("Network error");
  });

  // loadMoreAnimeList
  it("should load more anime and append data", async () => {
    const prevState: AnimeState = {
      ...initialState,
      list: {
        ...initialState.list,
        data: [{ mal_id: 1, title: "Naruto" } as any],
        pagination: { current_page: 1, has_next_page: true, last_visible_page: 1, items: { count: 0, total: 0, per_page: 16 } }
      }
    };

    axiosMock.get.mockResolvedValueOnce({
      data: {
        data: [{ mal_id: 2, title: "Bleach" }],
        pagination: { current_page: 2, has_next_page: false }
      }
    });

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ anime: prevState }));

    const result = await loadMoreAnimeList()(dispatch, getState, undefined);

    expect(result.type).toBe("anime/loadMoreAnimeList/fulfilled");

    const newList = (result.payload as AnimeListResponse).data;
    expect(newList).toHaveLength(2);
    expect(newList[1].title).toBe("Bleach");
  });

  it("should not load more when has_next_page = false", async () => {
    const prevState: AnimeState = {
      ...initialState,
      list: { ...initialState.list, pagination: { ...initialState.list.pagination, has_next_page: false } }
    };

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ anime: prevState }));

    const result = await loadMoreAnimeList()(dispatch, getState, undefined);

    expect(result.payload).toBeNull();
  });

  // fetchAnimeDetail
  it("should fetch anime detail successfully", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: { data: { mal_id: 1, title: "Naruto" } }
    });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchAnimeDetail("1")(dispatch, getState, undefined);

    expect(result.type).toBe("anime/fetchAnimeDetail/fulfilled");
    expect((result.payload as Anime).title).toBe("Naruto");
  });

  it("should handle fetchAnimeDetail error", async () => {
    axiosMock.get.mockRejectedValueOnce(new Error("404 Not Found"));

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchAnimeDetail("1")(dispatch, getState, undefined);

    expect(result.type).toBe("anime/fetchAnimeDetail/rejected");
    expect(result.payload).toBe("404 Not Found");
  });

  // Detail extraReducers
  it("should set loading state when fetching detail", () => {
    const state = reducer(initialState, { type: fetchAnimeDetail.pending.type });
    expect(state.detail.loading).toBe(true);
  });

  it("should store detail when fulfilled", () => {
    const state = reducer(initialState, {
      type: fetchAnimeDetail.fulfilled.type,
      payload: { mal_id: 1, title: "Naruto" }
    });
    expect(state.detail.anime?.title).toBe("Naruto");
  });

  it("should store error when detail fetch fails", () => {
    const state = reducer(initialState, {
      type: fetchAnimeDetail.rejected.type,
      payload: "Error occurred"
    });
    expect(state.detail.error).toBe("Error occurred");
  });
});
