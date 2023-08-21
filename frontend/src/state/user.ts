import { createSlice } from "@reduxjs/toolkit";
import { InitialState, LoginState } from "../interfaces/redux";

const initialState: InitialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action: LoginState) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout(state) {
      state.token = null,
      state.user = null
    }
  }
});

export default userSlice.reducer;
export const {setLogin, setLogout} = userSlice.actions;
