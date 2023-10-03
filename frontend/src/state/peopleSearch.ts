import { createSlice } from "@reduxjs/toolkit";
import { SearchPeopleInitial } from "../interfaces/redux";

const initialState: SearchPeopleInitial = {
  'searchBarIsActive': false,
  'searchBarValue': ""
}

const searchPeopleSlice = createSlice({
  name: 'peopleSearch',
  initialState,
  reducers: {
    setSearchBarIsActive: (state, action: {payload: boolean}) => {
      state.searchBarIsActive = action.payload
    }, 
    setSearchBarValue: (state, action: {payload: string}) => {
      state.searchBarValue = action.payload
    }
  }
})

export default searchPeopleSlice.reducer;
export const {setSearchBarIsActive, setSearchBarValue} = searchPeopleSlice.actions