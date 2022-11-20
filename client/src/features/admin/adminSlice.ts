import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { adminService } from "./adminService";
import { alert } from "../messages/messagesSlice";
import { IProduct } from "../../types/IProduct";
import { getProductById, getProducts } from "../products/productsSlice";
import { IKeyValuePair } from "../../types/IKeyValuePair";

interface AdminState extends BaseState {
    orders: IOrder[];
    products: IProduct[];
    product: IProduct;
}

const initialState: AdminState = {
    loading: false,
    success: false,
    error: undefined,
    orders: [],
    products: [],
    product: {} as IProduct
}

// Get orders
export const getOrders = createAsyncThunk(
    "admin/getOrders",
    async (_, thunkAPI) => {
        try {
            const orders = await adminService.getOrders(thunkAPI.dispatch);
            if (orders && orders.length > 0) { orders.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()); }
            return orders;
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create product
export const createProduct = createAsyncThunk(
    "admin/createProduct",
    async (product: IProduct & {userId: string}, thunkAPI) => {
        try {
            const createdProduct = await adminService.createProduct(product, thunkAPI.dispatch);
            if (createdProduct?.id) {
                thunkAPI.dispatch(alert({text: "Product created successfully", type: "success"}));
            }
            return createdProduct;
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    "admin/updateProduct",
    async (product: IProduct, thunkAPI) => {
        try {
            const updatedProduct = await adminService.updateProduct(product, thunkAPI.dispatch);
            if (updatedProduct?.id) {
                thunkAPI.dispatch(alert({text: "Product updated successfully", type: "success"}));
            }
            return updatedProduct;
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        updateCurrentProduct: (state, action: PayloadAction<IKeyValuePair<string>>) => {
            return {...state, product: {...state.product, ...action.payload}};
        },
        updateCurrentProductImages: (state, action: PayloadAction<{sort: number, url: string}>) => {
            let images = state.product.images;
            const {sort, url} = action.payload;
            if (images.find(i => i.sort === sort)) {
                if (!url) {
                    images = images.filter(image => image.sort !== sort);
                } else {
                    images = images.map(image => image.sort === sort ? action.payload : image);
                }
            } else {
                images = [...images, action.payload];
            }

            return {...state, product: {...state.product, images}};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => { state.loading = true; })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<IOrder[] | undefined>) => {
                return {...state, loading: false, success: true, orders: action.payload || []};
            })
            .addCase(getOrders.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(getProducts.pending, (state) => { state.loading = true; })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                return {...state, loading: false, success: true, products: action.payload || []};
            })
            .addCase(getProducts.rejected, (state, action: PayloadAction<unknown>) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(getProductById.pending, (state) => { state.loading = true; })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProduct>) => {
                return {...state, loading: false, success: true, product: action.payload || {} as IProduct};
            })
            .addCase(getProductById.rejected, (state, action: PayloadAction<unknown>) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(createProduct.pending, (state) => { state.loading = true; })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<IProduct | undefined>) =>{
                return {...state, loading: false, success: true, product: action.payload || {} as IProduct};
            })
            .addCase(createProduct.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(updateProduct.pending, (state) => { state.loading = true; })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct | undefined>) =>{
                return {...state, loading: false, success: true, product: action.payload || {} as IProduct};
            })
            .addCase(updateProduct.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
    }
});

export const { updateCurrentProduct, updateCurrentProductImages } = adminSlice.actions;
export default adminSlice.reducer;