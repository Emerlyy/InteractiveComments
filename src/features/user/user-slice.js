import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (_, action) => action.payload
  }
});

const userReducer = userSlice.reducer;

export default userReducer;

export const {
  setUser
} = userSlice.actions;

export const selectUser = (state) => state.user;