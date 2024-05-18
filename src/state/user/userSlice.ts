import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null },
  reducers: {
    setUser: (user, action) => {
      user.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
