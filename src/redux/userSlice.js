import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_obj: {
      user: {
        id: null,
        nickname: "비회원",
      },
    },
    user_storedCities: [],
    mapIcon: true,
  },
  reducers: {
    SET_USER: (state, action) => {
      state.user_obj = { ...state.user_obj, user: action.payload };
    },
    SET_STORED_CITIES: (state, action) => {
      state.user_storedCities = action.payload;
    },
    SET_MAP_ICON: (state, action) => {
      state.mapIcon = action.payload;
    },
  },
});

export const { SET_USER, SET_STORED_CITIES, SET_MAP_ICON } = userSlice.actions;

export default userSlice.reducer;
