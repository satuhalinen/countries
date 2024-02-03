import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
    },
    clearFavourites(state, action) {
      state.favourites = [];
    },
  },
});

export const { addFavourite, clearFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
