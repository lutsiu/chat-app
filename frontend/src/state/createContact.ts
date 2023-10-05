import { createSlice } from "@reduxjs/toolkit";
import { CreateContactInitial } from "../interfaces/redux";

const initialState: CreateContactInitial = {
  contactEmail: '',
  contactQuery: ''
}

const createContactSlice = createSlice({
  name: 'createContact', 
  initialState, 
  reducers: {
    addContactEmail(state, action: {payload: string}) {
      state.contactEmail = action.payload;
    },
    setSearchContact(state, action: {payload: string}) {
      state.contactQuery = action.payload;
    }
  }
})

export default createContactSlice.reducer
export const {addContactEmail, setSearchContact} = createContactSlice.actions