import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    genres: [],
    platforms: [],
    ordering: "",
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilters: (state) => {
      state.genres = [];
      state.platforms = [];
      state.ordering = "";
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
