import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    SET_USER: (state, action) => {
      state.user = { ...state.user, user: action.payload };
    },
  },
});

export const { SET_USER } = userSlice.actions;

export default userSlice.reducer;
