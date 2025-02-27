import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface LoadingState {
  loading: boolean;
  loadingState: boolean; 
}

const initialState: LoadingState = {
  loading: false,
  loadingState: false,
};

// Loading slice
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loadingState = action.payload;
    },
  },
});

export const { setLoading, setLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;
