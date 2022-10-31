import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../types/IMessage";

interface MessagesState {
    messages: IMessage[];
}

const initialState: MessagesState = {
    messages: []
}

// export function alert(text: string, type: string, timeout = 7000) {
//     return async (dispatch, getState) => {
//         const id = uuidv4();
//         const obj = {
//             msg,
//             alertType,
//             timeout,
//             id,
//         };

//         dispatch(sA(obj));
//         setTimeout(() => dispatch(rA(id)), timeout);
//     };
// }

export const alert = createAsyncThunk(
    "messages/alert",
    async (message: {text: string, type: string}, thunkAPI) => {
        const id = uuidv4();
        const {text, type} = message;
        thunkAPI.dispatch(setMessage({id, text, type}));
        setTimeout(() => thunkAPI.dispatch(removeMessage(id)), 7000);
    }
);

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Partial<IMessage>>) => {
            //const id = uuidv4();
            state.messages.push(action.payload as IMessage);

            //setTimeout(() => state.messages.filter(m => m.id !== id), 7000);
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages.filter((m) => m.id !== action.payload); 
        }
    }
});

export const { setMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;


// const initialState: [] = [];

// const alertSlice = createSlice({
//   name: 'alert',
//   initialState,
//   reducers: {
//     sA(state, action) {
//       [...state, action.payload];
//       toast[action.payload.alertType](action.payload.msg);
//     },
//     rA(state, action) {
//       return state.filter((a) => a.id !== action.payload.id);
//     },
//   },
// });

// export const { sA, rA } = alertSlice.actions;

// export function alert(msg, alertType, timeout = 5000) {
//   return async (dispatch, getState) => {
//     const id = uuidv4();
//     const obj = {
//       msg,
//       alertType,
//       timeout,
//       id,
//     };

//     dispatch(sA(obj));
//     setTimeout(() => dispatch(rA(id)), timeout);
//   };
// }

// export default alertSlice;