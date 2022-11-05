import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { alert } from "../messages/messagesSlice";
import { orderService } from "./orderService";

interface OrderState extends Partial<IOrder>, BaseState {}

const initialState: OrderState = {
    loading: false,
    error: undefined,
    success: false,
    orderNumber: 0,
    first: "",
    middle: "",
    last: "",
    orderItems: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    paymentMethod: undefined,
    shippingAddress: undefined,
    shippingOption: undefined,
}

// Submit order
export const submitOrder = createAsyncThunk(
    "order/submit",
    async (order: IOrder, thunkAPI) => {
        try {
            return await orderService.submit(order);
        } catch (error) {
            console.log(error);
            const message = narrowError(error);
            console.log(message);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => { state.loading = true; })
            .addCase(submitOrder.fulfilled, (state, action) => {
                return {loading: false, success: true, ...action.payload}
            })
            .addCase(submitOrder.rejected, (state, action) => {
                return {loading: false, success: false, error: narrowError(action.payload)}
            })
    }
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
