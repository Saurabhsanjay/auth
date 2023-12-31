import { combineReducers, configureStore } from "@reduxjs/toolkit";

import newsReducer from "../Redux/features/NewsSlice"; 

const rootReducer = combineReducers({
 
  news: newsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
