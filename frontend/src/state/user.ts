import { createSlice } from "@reduxjs/toolkit";
import {
  UserInitialState,
  LoginState,
  ActionWithContact,
  ActionChangeContactName,
  ActionWithStatus
} from "../interfaces/redux";

const initialState: UserInitialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action: LoginState) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout(state) {
      (state.token = null), (state.user = null);
    },
    setBio(state, action: { payload: string }) {
      if (state.user) {
        state.user.bio = action.payload;
      }
    },
    setUserName(state, action: { payload: string }) {
      if (state.user) {
        state.user.userName = action.payload;
      }
    },
    setFullName(state, action: { payload: string }) {
      if (state.user) {
        state.user.fullName = action.payload;
      }
    },
    setProfilePicture(state, action: { payload: string }) {
      if (state.user) {
        state.user.profilePictures.push(action.payload);
      }
    },
    setContact(state, action: ActionWithContact) {
      if (state.user) {
        state.user.contacts.push(action.payload);
      }
    },
    changeContactName(state, action: ActionChangeContactName) {
      const { name, id } = action.payload;
      if (state.user && state.user.contacts) {
        state.user.contacts = state.user.contacts.map((contact) => {
          const matchingContact =
            contact._id === id;
          if (!matchingContact) {
            return contact;
          } else {
            contact.name = name;
            return contact;
          }
        });
      }
    },
    setStatus(state, action: ActionWithStatus) {
      if (state.user) {
        state.user.status = action.payload
      }
    }
  },
});

export default userSlice.reducer;
export const {
  setLogin,
  setLogout,
  setBio,
  setFullName,
  setUserName,
  setProfilePicture,
  setContact,
  changeContactName,
  setStatus
} = userSlice.actions;
