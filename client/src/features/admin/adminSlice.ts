import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { adminService } from "./adminService";
import { alert } from "../messages/messagesSlice";
import { IProduct } from "../../types/IProduct";
import { getProductById, getProducts } from "../products/productsSlice";
import { IKeyValuePair } from "../../types/IKeyValuePair";
import { IUser } from "../../types/IUser";

interface AdminState extends BaseState {
    orders: IOrder[];
    products: IProduct[];
    product: IProduct;
    users: IUser[];
    user: IUser;
}

const initialState: AdminState = {
    loading: false,
    success: false,
    error: undefined,
    orders: [],
    products: [],
    product: {} as IProduct,
    users: [],
    user: {} as IUser
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

// Get all users
export const getUsers = createAsyncThunk(
    "admin/getUsers",
    async (_, thunkAPI) => {
        try {
            return await adminService.getUsers(thunkAPI.dispatch);
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user by id
export const getUserById = createAsyncThunk(
    "admin/getUserById",
    async (id: string, thunkAPI) => {
        try {
            return await adminService.getUser(id, thunkAPI.dispatch);
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create user
export const createUser = createAsyncThunk(
    "admin/createUser",
    async (user: IUser, thunkAPI) => {
        try {
            const createdUser = await adminService.createUser(user, thunkAPI.dispatch);
            if (createdUser?.id) {
                thunkAPI.dispatch(alert({text: "User created successfully", type: "success"}));
            }
            return createdUser;
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async (user: IUser, thunkAPI) => {
        try {
            const updatedUser = await adminService.updateUser(user, thunkAPI.dispatch);
            if (updatedUser?.id) {
                thunkAPI.dispatch(alert({text: "User updated successfully", type: "success"}));
            }
            return updatedUser;
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
        },
        // update user from the user details page
        updateCurrentUser: (state, action: PayloadAction<IKeyValuePair<string | boolean>>) => {
            return {...state, user: {...state.user, ...action.payload}};
        },
        // update user from the users list
        updateUserById: (state, action) => {
            const {id, ...rest} = action.payload;
            return {...state, users: state.users.map(u => u.id === id ? {...u, ...rest} : u)};
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
            .addCase(getUsers.pending, (state) => { state.loading = true; })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                return {...state, loading: false, success: true, users: action.payload || []};
            })
            .addCase(getUsers.rejected, (state, action: PayloadAction<unknown>) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(getUserById.pending, (state) => { state.loading = true; })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
                return {...state, loading: false, success: true, user: action.payload || {} as IProduct};
            })
            .addCase(getUserById.rejected, (state, action: PayloadAction<unknown>) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(updateUser.pending, (state) => { state.loading = true; })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser | undefined>) =>{
                return {...state, loading: false, success: true, user: action.payload || {} as IUser};
            })
            .addCase(updateUser.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
            .addCase(createUser.pending, (state) => { state.loading = true; })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser | undefined>) =>{
                return {...state, loading: false, success: true, user: action.payload || {} as IUser};
            })
            .addCase(createUser.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload)};
            })
    }
});

export const { updateCurrentProduct, updateCurrentProductImages, updateCurrentUser, updateUserById } = adminSlice.actions;
export default adminSlice.reducer;