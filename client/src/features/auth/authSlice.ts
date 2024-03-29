import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { loggedInUserFromStorage } from "../../utils/authUtils";
import { narrowError } from "../../utils/errorUtils";
import { BaseState } from "../BaseState";
import { alert } from "../messages/messagesSlice";
import { authService } from "./authService";

interface AuthState extends BaseState {
    isAuthenticated: boolean;
    loggedInUser: IUser | undefined
}

const initialState: AuthState = {
    loading: false,
    error: undefined,
    success: false,
    isAuthenticated: !!loggedInUserFromStorage()?.token,
    loggedInUser: loggedInUserFromStorage()?.token ? loggedInUserFromStorage() : undefined
}

// Register user
export const register = createAsyncThunk(
    "auth/register",
    async (user: IUser, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Log in user
export const login = createAsyncThunk(
    "auth/login",
    async (user: IUser, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Log out user
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return await authService.logout();
    }
);

// Reset password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (creds: {token: string, password: string}, thunkAPI) => {
        try {
            const {token, password} = creds;
            const updated = await authService.resetPassword(token, password);
            if (updated?.id) {
                thunkAPI.dispatch(alert({text: "Password reset successfully", type: "success"}));
            }
            return updated;
        } catch (error) {
            const message = narrowError(error);
            thunkAPI.dispatch(alert({text: message, type: "danger"}));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => { state.loading = true; })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.isAuthenticated = true;
                state.loggedInUser = action.payload as IUser;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = narrowError(action.payload);
                state.isAuthenticated = false;
                state.loggedInUser = {} as IUser;
            })
            .addCase(login.pending, (state) => { state.loading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.isAuthenticated = true;
                state.loggedInUser = action.payload as IUser;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = narrowError(action.payload);
                state.isAuthenticated = false;
                state.loggedInUser = {} as IUser;
            })
            .addCase(logout.fulfilled, (state) => { 
                state.isAuthenticated = false;
                state.loggedInUser = {} as IUser; 
            })
            .addCase(resetPassword.pending, (state) => { state.loading = true; })
            .addCase(resetPassword.fulfilled, (state, action) => {
                return {...state, loading: false, success: true, isAuthenticated: true, loggedInUser: action.payload as IUser};
            })
            .addCase(resetPassword.rejected, (state, action) => {
                return {...state, loading: false, success: false, error: narrowError(action.payload), isAuthenticated: false, loggedInUser: {} as IUser};
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;