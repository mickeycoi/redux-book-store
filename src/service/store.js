import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

const store = configureStore({
  reducer: {
    book: slice,
  },
});

export default store;
