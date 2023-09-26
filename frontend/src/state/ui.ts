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
  showSearchBar: false
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
    setShowSearchBar: (state) => {
      state.showSearchBar = state.showSearchBar ? false : true;
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
      state.showSearchBar = false;
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
  setShowSearchBar,
  hideEverything,
} = uiSlice.actions;
