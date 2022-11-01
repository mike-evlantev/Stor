import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IMessage } from "../../types/IMessage";

interface MessagesState {
    messages: IMessage[];
}

const initialState: MessagesState = {
    messages: []
}

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
            state.messages.push(action.payload as IMessage);
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter((m) => m.id !== action.payload); 
        }
    }
});

export const { setMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;