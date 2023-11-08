import { createSlice } from "@reduxjs/toolkit";
import { bookType } from "../../../types/note";

interface Ibook {
  allbooks: bookType[];
  featuredbooks: bookType[];
}

const initialState: Ibook = {
  allbooks: [],
  featuredbooks: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

// export const {} = bookSlice.actions;

export default bookSlice.reducer;
