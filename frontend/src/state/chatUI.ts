import { createSlice } from "@reduxjs/toolkit";
import { ChatUIState, ActionWithMessageMediaOverlay, ActionWithMessageContextMenu } from "../interfaces/redux";

const initialState: ChatUIState = {
  mediaOverlay: {
    file: null,
    message: null,
    showOverlay: false
  },
  contextMenu: {
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
    setShowContextMenu(state, action: ActionWithMessageContextMenu) {
      state.contextMenu = action.payload;
    }
  }
});

export default chatUISlice.reducer;
export const {setShowContextMenu, setShowMediaOverlay} = chatUISlice.actions;