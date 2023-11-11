import { createSlice } from "@reduxjs/toolkit";
import { notebookType } from "../../../types/notebook";

interface Inotebook {
  allnotebooks: notebookType[];
  featurednotebooks: notebookType[];
}

const initialState: Inotebook = {
  allnotebooks: [],
  featurednotebooks: [],
};

const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {},
});

export default notebookSlice.reducer;
