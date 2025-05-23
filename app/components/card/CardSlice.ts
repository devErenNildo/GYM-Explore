import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  favorites: string[];
  likes: string[];
}

const initialState: CardState = {
  favorites: [],
  likes: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.likes.includes(id)) {
        state.likes = state.likes.filter(likeId => likeId !== id);
      } else {
        state.likes.push(id);
      }
    },
    resetCardState: () => initialState,
  },
});

export const { toggleFavorite, toggleLike, resetCardState } = cardSlice.actions;
export default cardSlice.reducer;