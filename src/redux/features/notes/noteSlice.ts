import { createSlice } from "@reduxjs/toolkit";
import { noteType } from "../../../types/note";

interface Inote {
  allnotes: noteType[];
  featurednotes: noteType[];
}

const initialState: Inote = {
  allnotes: [],
  featurednotes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
});

export default noteSlice.reducer;
