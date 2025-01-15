import { Get_Admins_Api } from "@/services/auth/route";
import { IUserTypes } from "@/types/adminUserTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



type FormData = {
    admin:IUserTypes[];
    token: string | null;
    isLoading: boolean;
    isLogged: boolean;
    error: string | null;
}

// Initial state
const initialState:FormData = {
  admin: [],
  token: null,
  isLoading: false,
  isLogged:false,
  error: null,
};

// Async thunk for login
export const fetchAdminDetails = createAsyncThunk(
  "admin/fetchAdminDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Get_Admins_Api();
      // console.log(response);
      
      if (response.status == 200 || response.data.success === true) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch admin details");
      }
    } catch (error:any) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.admin = [];
      state.token = null;
      state.isLogged = false;
    },
    setUserData: (state, action) => {
      state.admin = action.payload;
      state.isLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.data
      state.isLogged = true;
      })
      .addCase(fetchAdminDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;

        // Check if payload is a string or an object and handle accordingly
        if (typeof action.payload === "string") {
          state.error = action.payload; // String error message
        } else if (action.payload && typeof action.payload === "object") {
          // Cast payload to 'any' to safely access 'data'
          const errorPayload = action.payload as any;
          state.error = errorPayload?.data?.message || "Unknown error";
        } else {
          state.error = "Unknown error";
        }
      });
  },
});

export const { logoutState, setUserData } = authSlice.actions;

export default authSlice.reducer;

// Selector to get the auth state
// export const selectAuth = (state) => state.auth;
