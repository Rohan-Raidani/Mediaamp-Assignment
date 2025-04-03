import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import favoritesReducer from "./favoritesSlice";
import filtersReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export default store;
