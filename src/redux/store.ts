import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSliceReducer from "./features/auth/authSlice";
import noteSliceReducer from "./features/notes/noteSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    note: noteSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
