import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { yaraApi } from "./api";

export const store = configureStore({
  reducer: {
    [yaraApi.reducerPath]: yaraApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(yaraApi.middleware),
});


setupListeners(store.dispatch);