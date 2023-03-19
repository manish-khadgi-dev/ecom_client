import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.admin = action.payload;
    },
    unSetUser: (state) => {
      state.admin = {};
    },
  },
});

const { reducer, actions } = adminSlice;

export const { setUser, unSetUser } = actions;

export default reducer;
