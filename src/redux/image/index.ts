import { createSlice } from "@reduxjs/toolkit";

export interface User {
  images: any[];
  error: object;
  loading: boolean;
}

const initialState: User = {
  images: [],
  error: {},
  loading: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    saveImage: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    editSaveImage: (state, action) => {
      const imagesCopy = [...state.images];
      const index = imagesCopy.findIndex((image) => image.id === action.payload.id);

      if (index !== -1) {
        imagesCopy.splice(index, 1, action.payload);
        state.images = imagesCopy;
      }
    },
  },
});

export const { saveImage, editSaveImage } = imageSlice.actions;

export default imageSlice.reducer;
