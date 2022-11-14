import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { adminService } from "./adminService";
import { alert } from "../messages/messagesSlice";

interface AdminState extends BaseState {
    orders: IOrder[];
}

const initialState: AdminState = {
    loading: false,
    success: false,
    error: undefined,
    orders: []
}

// Get orders
export const getOrders = createAsyncThunk(
    "admin/getOrders",
    async (_, thunkAPI) => {
        try {
            const orders = await adminService.getOrders(thunkAPI.dispatch);
            if (orders?.length > 0) orders.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
            return orders;
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => { state.loading = true; })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
                state.loading = false;
                state.success = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = narrowError(action.payload);
                state.orders = [];
            })
    }
});

//export const { reset } = adminSlice.actions;
export default adminSlice.reducer;