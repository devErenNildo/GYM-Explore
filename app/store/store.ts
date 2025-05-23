import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../components/card/CardSlice";

export const store = configureStore({
  reducer: {

    card: cardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
