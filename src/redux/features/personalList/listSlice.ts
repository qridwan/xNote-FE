import { createSlice } from "@reduxjs/toolkit";
import { bookType } from "../../../types/note";

interface Ibook {
  wishList: bookType[];
  currentlyReading: bookType[];
}

const initialState: Ibook = {
  wishList: [],
  currentlyReading: [],
};

const listSlice = createSlice({
  name: "List",
  initialState,
  reducers: {},
});

// export const {} = bookSlice.actions;

export default listSlice.reducer;
