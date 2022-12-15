import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/IProduct";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { alert } from "../messages/messagesSlice";
import { productsService } from "./productsService";

interface ProductsState extends BaseState {
    products: IProduct[];
    product: IProduct;
}

const initialState: ProductsState = {
    loading: false,
    error: undefined,
    success: false,
    products: [],
    product: {} as IProduct
}

// Get all prodcuts
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            return await productsService.getProducts();
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get prodcut by id
export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id: string, thunkAPI) => {
        try {
            return await productsService.getProduct(id);
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => { state.loading = true; })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.loading = false;
                state.success = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.success = false;
                state.error = narrowError(action.payload);
                state.products = [];
            })
            .addCase(getProductById.pending, (state) => { state.loading = true; })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.loading = false;
                state.success = true;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.success = false;
                state.error = narrowError(action.payload);
                state.product = {} as IProduct;
            })
    }
});

export default productsSlice.reducer;