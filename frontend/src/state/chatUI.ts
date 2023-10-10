import { createSlice } from "@reduxjs/toolkit";
import { ChatUIState, ActionWithMessageMediaOverlay, ActionWithMessageContextMenu, ActionWithContentContextMenu } from "../interfaces/redux";

const initialState: ChatUIState = {
  mediaOverlay: {
    file: null,
    message: null,
    showOverlay: false
  },
  contentContextMenu: {
    x: null,
    y: null, 
    showMenu: false,
    message: null,
    file: null
  },
  messageContextMenu: {
    x: null,
    y: null, 
    showMenu: false,
    message: null,
    editable: false,
    messageUpperPoint: undefined, 
    mediaSrc: '',
    mediaType: null
  }
}

const chatUISlice = createSlice({
  name: 'chatUI',
  initialState,
  reducers: {
    setShowMediaOverlay(state, action: ActionWithMessageMediaOverlay) {
      state.mediaOverlay = action.payload
    },
    setShowContentContextMenu(state, action: ActionWithContentContextMenu) {
      state.contentContextMenu = action.payload;
    },
    setShowMessageContextMenu(state, action: ActionWithMessageContextMenu) {
      state.messageContextMenu = action.payload;
    }
  }
});

export default chatUISlice.reducer;
export const {setShowContentContextMenu, setShowMediaOverlay, setShowMessageContextMenu} = chatUISlice.actions;