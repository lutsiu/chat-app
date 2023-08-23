import { createSlice } from "@reduxjs/toolkit";
import { UiInitialState } from "../interfaces/redux";

const initialState: UiInitialState = {
  showOverlay: false,
  showLeftMenu: false,
  showCreateGroupStep1: false,
  showCreateGroupStep2: false,
  showContacts: false,
  showCreateContact: false,
  showSettings: false,
  showMyAccountSettings: false,
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
    hideEverything: (state) => {
      state.showOverlay = false
      state.showContacts = false
      state.showCreateGroupStep1 = false
      state.showCreateGroupStep2 = false
      state.showLeftMenu = false
      state.showCreateContact = false
      state.showMyAccountSettings = false
      state.showSettings = false
    }
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
  hideEverything
} = uiSlice.actions;
