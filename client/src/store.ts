import { configureStore } from '@reduxjs/toolkit'
import adminReducer from "./features/admin/adminSlice";
import authReducer from "./features/auth/authSlice";
import bagReducer from "./features/bag/bagSlice";
import customerReducer from "./features/user/customerSlice";
import messagesReducer from "./features/messages/messagesSlice";
import orderReducer from "./features/order/orderSlice";
import productsReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    bag: bagReducer,
    customer: customerReducer,
    messages: messagesReducer,
    order: orderReducer,
    products: productsReducer
  },
  devTools: process.env.NODE_ENV === "production" ? false : true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;