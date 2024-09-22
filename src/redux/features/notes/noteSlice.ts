import { createSlice } from "@reduxjs/toolkit";
import { noteType } from "../../../types/note";

interface Inote {
  allnotes: noteType[];
  featurednotes: noteType[];
  settings: {
    color?: string;
    searchTerm?: string;
    category?: number;
    sortOrder?: string;
    filterByTrash?: boolean;
    filterByPinned?: boolean;
    sidebar?: "short" | "default" | "hide";
  };
}

const initialState: Inote = {
  allnotes: [],
  featurednotes: [],
  settings: {
    sidebar: "default",
  },
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.settings["sidebar"] = action.payload;
    },
  },
});
export const { setSidebar } = noteSlice.actions;

export default noteSlice.reducer;
