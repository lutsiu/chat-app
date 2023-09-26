import { createSlice } from "@reduxjs/toolkit";
import {
  MessageInitialState,
  ActionWithReply,
  ActionWithMessage,
  ActionWithScroll,
  UIActionWithMessage,
  ActionWithSearch,
} from "../interfaces/redux";

const initialState: MessageInitialState = {
  replyToMessage: {
    show: false,
    message: null,
    messageUpperPoint: undefined,
    senderId: "",
  },
  editMessage: {
    show: false,
    message: null,
    messageUpperPoint: undefined,
  },
  forwardMessage: {
    show: false,
    message: null,
  },
  searchMessages: null,
  scrollToMessage: null,
  messagesContainerScrollTop: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    handleReplytoMessage: (state, action: ActionWithReply) => {
      const { payload } = action;
      const { show, message, messageUpperPoint, senderId } = payload;
      state.replyToMessage.show = show;
      state.replyToMessage.message = message;
      state.replyToMessage.messageUpperPoint = messageUpperPoint;
      state.replyToMessage.senderId = senderId;
    },
    handleEditMessage: (state, action: UIActionWithMessage) => {
      const { payload } = action;
      const { show, message, messageUpperPoint } = payload;
      state.editMessage.show = show;
      state.editMessage.message = message;
      state.editMessage.messageUpperPoint = messageUpperPoint;
    },
    handleForwardMessage: (state, action: UIActionWithMessage) => {
      const { payload } = action;
      const { show, message } = payload;
      state.forwardMessage.show = show;
      state.forwardMessage.message = message;
    },
    handleScrollToMessage: (state, action: ActionWithScroll) => {
      const { top } = action.payload;
      if (!top) {
        state.scrollToMessage = null;
      } else {
        state.scrollToMessage = { top };
      }
    },
    setMessageContainerScrollTop: (state, action: { payload: number }) => {
      const top = action.payload;
      state.messagesContainerScrollTop = top;
    },
    setSearchedMessages: (state, action: ActionWithSearch) => {
      const {payload} = action;
      state.searchMessages = payload;
    }
  },
});

export default messageSlice.reducer;
export const {
  handleScrollToMessage,
  handleEditMessage,
  handleForwardMessage,
  handleReplytoMessage,
  setMessageContainerScrollTop,
  setSearchedMessages
} = messageSlice.actions;
