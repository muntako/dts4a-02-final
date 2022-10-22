import create from "zustand";
import tmdb from "../apis/tmdb";

// slice
const sliceMovie = (set) => ({
  // state (IMMUTABLE)
  movies: [],
  searchMovies: [],
  trendingMovies: [],
  movie:null,
  isLoading: false,
  error: null,

  // actions
  // 1. comot data dari jikan.moe
  fetchMovie: async () => {
    try {
      // isLoading = true;
      set({ isLoading: true });

      const { data } = await tmdb.get("discover/movie");
      set((state) => ({
        ...state,
        isLoading: false,
        movies: data.results,
      }));
    } catch (err) {
      set({
        isLoading: false,
        error: err,
      });
    }
  },

  // upcoming
  upcomingMovie: async () => {
    try {
      // isLoading = true;
      set({ isLoading: true });

      const { data } = await tmdb.get("movie/upcoming");
      set((state) => ({
        ...state,
        isLoading: false,
        movies: data.results,
      }));
    } catch (err) {
      set({
        isLoading: false,
        error: err,
      });
    }
  },

  // upcoming
  detailMovie: async (id) => {
    try {
      // isLoading = true;
      set({ isLoading: true });

      const { data } = await tmdb.get(`movie/${id}`);
      set((state) => ({
        ...state,
        isLoading: false,
        movie: data,
      }));
    } catch (err) {
      set({
        isLoading: false,
        error: err,
      });
    }
  },

  searchMovie: async (key) => {
    try {
      // isLoading = true;
      // set({ isLoading: true });

      const { data } = await tmdb.get(`search/multi`, {
        params: {
            query: key
        }});
      set((state) => ({
        ...state,
        searchMovies: data.results,
      }));
    } catch (err) {
      set({
        isLoading: false,
        error: err,
      });
    }
  },

  trendingMovie: async (key) => {
    try {
      // isLoading = true;
      // set({ isLoading: true });

      const { data } = await tmdb.get("trending/movie/day");
      set((state) => ({
        ...state,
        trendingMovies: data.results,
      }));
    } catch (err) {
      set({
        isLoading: false,
        error: err,
      });
    }
  },

  resetSearchMovies: () => {
    set((state) => ({
      ...state,
      searchMovies:[]
    }));
  }

});

// hooks
const useMovieStore = create(sliceMovie);

// selector
export const selectMovies = (state) => state.movies;
export const selectedMovie = (state) => state.movie;
export const selectDetailMovie = (state) => state.detailMovie;
export const selectIsLoading = (state) => state.isLoading;
export const selectError = (state) => state.error;
export const selectFetchMovies = (state) => state.fetchMovie;
export const selectUpcomingMovies = (state) => state.upcomingMovie;
export const selectSearchMovies = (state) => state.searchMovie;
export const searchedMovies = (state) => state.searchMovies;
export const selectResetSearchedMovies = (state) => state.resetSearchMovies;
export const selectTrendingMovies = (state) => state.trendingMovie;
export const selectedTrendingMovies = (state) => state.trendingMovies;

// export
export default useMovieStore;