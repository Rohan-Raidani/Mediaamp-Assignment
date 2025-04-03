import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_RAWG;
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page = 1, search = "", filters = {} }) => {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        page,
        search,
        ...filters,
      },
    });
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 20);
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gamesSlice.reducer;
