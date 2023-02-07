import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { nickname: "jisun", birth: "0322" },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, nickname: action.payload.userNickName };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
