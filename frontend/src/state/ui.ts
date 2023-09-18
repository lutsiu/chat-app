import { createSlice } from "@reduxjs/toolkit";
import { UiInitialState, ActionWithMessage, ActionWithScroll, ActionWithReply } from "../interfaces/redux";

const initialState: UiInitialState = {
  showOverlay: false,
  showLeftMenu: false,
  showCreateGroupStep1: false,
  showCreateGroupStep2: false,
  showContacts: false,
  showCreateContact: false,
  showSettings: false,
  showMyAccountSettings: false,
  showEditContactProfile: false,
  showWarningPopup: false,
  replyToMessage: {
    show: false,
    message: null,
    messageUpperPoint: undefined,
    senderId: ''
  },
  editMessage: {
    show: false,
    message: null,
    messageUpperPoint: undefined
  },
  forwardMessage: {
    show: false,
    message: null,
  },
  scrollToMessage: null
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowOverlay: (state) => {
      state.showOverlay = state.showOverlay ? false : true;
    },
    setShowLeftMenu: (state) => {
      state.showLeftMenu = state.showLeftMenu ? false : true;
    },
    setShowCreateGroupStep1: (state) => {
      state.showCreateGroupStep1 = state.showCreateGroupStep1 ? false : true;
    },
    setShowCreateGroupStep2: (state) => {
      state.showCreateGroupStep2 = state.showCreateGroupStep2 ? false : true;
    },
    setShowContacts: (state) => {
      state.showContacts = state.showContacts ? false : true;
    },
    setShowCreateContact: (state) => {
      state.showCreateContact = state.showCreateContact ? false : true;
    },
    setShowSettings: (state) => {
      state.showSettings = state.showSettings ? false : true;
    },
    setShowMyAccountSettings: (state) => {
      state.showMyAccountSettings = state.showMyAccountSettings ? false : true;
    },
    setShowEditContactProfile: (state) => {
      state.showEditContactProfile = state.showEditContactProfile
        ? false
        : true;
    },
    setShowWarningPopup: (state) => {
      state.showWarningPopup = state.showWarningPopup ? false : true;
    },
    handleReplytoMessage: (state, action: ActionWithReply) => {
      const {payload} = action;
      const {show, message, messageUpperPoint, senderId} = payload
      state.replyToMessage.show = show
      state.replyToMessage.message = message
      state.replyToMessage.messageUpperPoint = messageUpperPoint;
      state.replyToMessage.senderId = senderId
    },
    handleEditMessage: (state, action: ActionWithMessage) => {
      const {payload} = action;
      const {show, message, messageUpperPoint} = payload
      state.editMessage.show = show
      state.editMessage.message = message
      state.editMessage.messageUpperPoint = messageUpperPoint;
    },
    handleForwardMessage: (state, action: ActionWithMessage) => {
      const {payload} = action;
      const {show, message} = payload
      state.forwardMessage.show = show
      state.forwardMessage.message = message
    },
    handleScrollToMessage: (state, action: ActionWithScroll) => {
      const {top} = action.payload;
      if (!top) {
        state.scrollToMessage = null
      } else {
        state.scrollToMessage = {top};
      }
    },
    hideEverything: (state) => {
      state.showOverlay = false;
      state.showContacts = false;
      state.showCreateGroupStep1 = false;
      state.showCreateGroupStep2 = false;
      state.showLeftMenu = false;
      state.showCreateContact = false;
      state.showMyAccountSettings = false;
      state.showSettings = false;
      state.showEditContactProfile = false;
      state.showWarningPopup = false;
    },
  },
});

export default uiSlice.reducer;
export const {
  setShowOverlay,
  setShowLeftMenu,
  setShowCreateGroupStep1,
  setShowCreateGroupStep2,
  setShowContacts,
  setShowCreateContact,
  setShowSettings,
  setShowMyAccountSettings,
  setShowEditContactProfile,
  setShowWarningPopup,
  hideEverything,
  handleEditMessage,
  handleForwardMessage,
  handleReplytoMessage,
  handleScrollToMessage
} = uiSlice.actions;
