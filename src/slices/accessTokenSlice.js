import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: {
    value: "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken } =
  accessTokenSlice.actions;

export default accessTokenSlice.reducer;
