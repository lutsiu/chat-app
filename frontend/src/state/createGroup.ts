import { createSlice } from "@reduxjs/toolkit";
import { ActionWithGroup, ActionWithGroupUser, CreateGroupInitial } from "../interfaces/redux";

const initialState: CreateGroupInitial = {
  groupName: '',
  groupImg: null,
  groupUsers: []
}

const createGroupSlice = createSlice({
  name: 'createGroup',
  initialState,
  reducers: {
    setGroup: (state, action: ActionWithGroup) => {
      state.groupName = action.payload.groupName;
      if (action.payload.groupImg) {
        state.groupImg = action.payload.groupImg
      }
    },
    setGroupUsers: (state, action: ActionWithGroupUser) => {
      const {userId} = action.payload;
      const isAlreadyInGroup = state.groupUsers.findIndex(user => user === userId);
      if (isAlreadyInGroup === -1) {
        state.groupUsers.push(userId)
      } else {
        state.groupUsers = state.groupUsers.filter(user => user !== userId);
      }
    }
  }
})

export default createGroupSlice.reducer;
export const {setGroup, setGroupUsers} = createGroupSlice.actions;