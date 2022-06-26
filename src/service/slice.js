import { createSlice } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  bookDetail: {},
  favorites: [],
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    },
    addFavoriteBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getBookDetailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.bookDetail = action.payload;
    },
    getFavoriteBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.favorites = action.payload;
    },
    deleteFavoriteBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const getBooks =
  ({ pageNum, limit, query }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const response = await api.get(url);
      dispatch(slice.actions.getBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const addFavoriteBook =
  ({ addingBook }) =>
  async (dispatch) => {
    try {
      const response = await api.post(`/favorites`, addingBook);
      dispatch(slice.actions.addFavoriteBookSuccess(response.data));
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getBooksDetail =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get(`/books/${bookId}`);
      dispatch(slice.actions.getBookDetailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
export const getFavoriteBook =
  ({ removedBookId }) =>
  async (dispatch) => {
    if (removedBookId) return;
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get("/favorites");
      dispatch(slice.actions.getFavoriteBookSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const deleteFavoriteBook =
  ({ removedBookId }) =>
  async (dispatch) => {
    if (!removedBookId) return;
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.delete(`/favorites/${removedBookId}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
