import { createSlice } from "@reduxjs/toolkit";
import { ChatUIState, ActionWithMessageMediaOverlay, ActionWithMessageContextMenu } from "../interfaces/redux";

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
  }
}

const chatUISlice = createSlice({
  name: 'chatUI',
  initialState,
  reducers: {
    setShowMediaOverlay(state, action: ActionWithMessageMediaOverlay) {
      state.mediaOverlay = action.payload
    },
    setShowContentContextMenu(state, action: ActionWithMessageContextMenu) {
      state.contentContextMenu = action.payload;
    }
  }
});

export default chatUISlice.reducer;
export const {setShowContentContextMenu, setShowMediaOverlay} = chatUISlice.actions;