import { toggle_Product_Api } from "@/services/products/route";
import { IProducts } from "@/types/productType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductType {
  products: IProducts[];
  loading: boolean;
  error: string | null;
}

export const toggleProductButton = createAsyncThunk(
    "products/toggleProductButton",
    async (data: {
        productId: string;
        fieldName: string;
      }, { rejectWithValue }) => {
      try {
        const response = await toggle_Product_Api(data);
        // console.log(response);
  
        if (response.status == 200 || response.data.success === true) {
          console.log(response.data,'media');
          return response.data.products;
        } else {
          return rejectWithValue("Failed to fetch media details");
        }
      } catch (error: any) {
        return rejectWithValue(
          error.response ? error.response.data : "Network error"
        );
      }
    }
  );

const initialState: ProductType = {
  products: [],
  loading: false,
  error: null,
};
// 
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductRedux: (state, action: PayloadAction<IProducts[]>) => {
      state.products = action.payload; // Assigning an array directly
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleProductButton.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleProductButton.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(toggleProductButton.rejected, (state, action) => {
        state.loading = false;

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

export const { addProductRedux } = productSlice.actions;
export default productSlice.reducer;
