import { createSlice } from "@reduxjs/toolkit";
import { ChatStateInitial } from "../interfaces/redux";
import { IMessage, UserModel } from "../interfaces/models";

const initialState: ChatStateInitial = {
  dataIsLoading: true,
  chatId: null,
  interlocutor: null,
  chatMessages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState, 
  reducers: {
    setChatDataIsLoading(state, action: {payload: boolean}) {
      const isLoading = action.payload
      state.dataIsLoading = isLoading
    },
    setChatId(state, action: {payload: string | null}) {
      const chatId = action.payload;
      state.chatId = chatId
    },
    setInterlocutor(state, action: {payload: null | UserModel}) {
      const interlocutor = action.payload;
      state.interlocutor = interlocutor
    },
    setChatMessages(state, action: {payload: IMessage[]}) {
      state.chatMessages = action.payload;
    }
  }
})

export default chatSlice.reducer
export const {setChatDataIsLoading, setChatId, setInterlocutor, setChatMessages} = chatSlice.actions;