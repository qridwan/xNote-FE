import { createSlice } from "@reduxjs/toolkit";
import { trashType } from "../../../types/trash";

interface Itrash {
  alltrashs: trashType[];
  featuredtrashs: trashType[];
}

const initialState: Itrash = {
  alltrashs: [],
  featuredtrashs: [],
};

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {},
});

export default trashSlice.reducer;
