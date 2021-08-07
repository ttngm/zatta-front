import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = [];

export const fetchKeywords = createAsyncThunk(
  "keywords/fetchKeywords",
  async () => {
    const response = await fetch("/keyword");
    const result = await response.json();
    return result;
  }
);

export const counterSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchKeywords.fulfilled]: (state, action) => {
      return action.payload;
    }
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;

export const selectAllKeywords = (state) => state.keywords;
